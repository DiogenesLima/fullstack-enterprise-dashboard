import type { LoginDto, AuthResponse } from '@enterprise/api-contracts'

export const useAuth = () => {
  const token = useCookie('auth_token', { maxAge: 3600, sameSite: 'lax' })
  const user = useState<AuthResponse['user'] | null>('auth_user', () => null)
  const config = useRuntimeConfig()

  const login = async (credentials: LoginDto) => {
    try {
      const data = await $fetch<AuthResponse>('/auth/login', {
        method: 'POST',
        baseURL: config.public.apiBase,
        body: credentials
      })

      token.value = data.access_token
      user.value = data.user

      return navigateTo('/users')
    } catch (e: any) {
      throw e.data?.message || 'Login failed'
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    return navigateTo('/login')
  }

  return { token, user, login, logout, isAuthenticated: computed(() => !!token.value) }
}
