import type { UserPaginationResponse, CreateUserDto, ActionResponse } from '@enterprise/api-contracts'

export const useUsers = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // List users
  const fetchUsers = (search?: () => string, page?: Ref<number>) => {
    return useFetch<UserPaginationResponse>('/users', {
      baseURL: config.public.apiBase,
      query: computed(() => ({
        search: search ? search() : undefined,
        page: page?.value || 1,
        limit: 10
      })),
      watch: [page]
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


  return {
    fetchUsers,
    createUser,
    deleteUser
  }
}
