import type { LoginDto, AuthResponse } from '@enterprise/api-contracts'

export const useAuth = () => {
  const token = useCookie('auth_token', { maxAge: 3600, sameSite: 'lax' })
  const user = useState<AuthResponse['user'] | null>('auth_user', () => null)
  const config = useRuntimeConfig()
  const localePath = useLocalePath()
  const { $i18n } = useNuxtApp()

  const login = async (credentials: LoginDto) => {
    try {
      const data = await $fetch<AuthResponse>('/auth/login', {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: credentials
      })

      token.value = data.access_token
      user.value = data.user

      return navigateTo(localePath('/dashboard'))
    } catch (e: any) {
      throw e.data?.message || $i18n.t('messages.login_failed')
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    return navigateTo(localePath('/login'))
  }

  return { token, user, login, logout, isAuthenticated: computed(() => !!token.value) }
}
