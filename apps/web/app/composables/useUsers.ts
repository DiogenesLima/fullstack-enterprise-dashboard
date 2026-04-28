import type { UserPaginationResponse, UserResponse, CreateUserDto, ActionResponse } from '@enterprise/api-contracts'

export const useUsers = () => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // List users
  const fetchUsers = (search?: () => string, page?: Ref<number>) => {
    return useFetch<UserPaginationResponse>('/users', {
      baseURL: config.public.apiBase,
      query: computed(() => ({
        search: search ? search() : undefined,
        page: page?.value || 1,
        limit: 10,
        lang: locale.value
      })),
      watch: false
    })
  }

  // Create user
  const createUser = async (userData: CreateUserDto) => {
    return await $fetch<ActionResponse>('/users', {
      method: 'POST',
      baseURL: apiBase,
      body: userData
    })
  }

  // Delete user
  const deleteUser = async (id: string) => {
    return await $fetch(`/users/${id}`, {
      method: 'DELETE',
      baseURL: apiBase
    })
  }

  const getMe = () => {
    return useFetch<UserResponse>('/users/me', {
      baseURL: apiBase
    })
  }

  return {
    fetchUsers,
    createUser,
    deleteUser,
    getMe
  }
}
