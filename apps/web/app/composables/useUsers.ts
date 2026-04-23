import type { UserResponse, CreateUserDto, ActionResponse } from '@enterprise/api-contracts'

export const useUsers = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // List users
  const fetchUsers = (search?: () => string) => {
    return useFetch<UserResponse[]>('/users', {
      baseURL: config.public.apiBase,
      query: computed(() => ({
        search: search ? search() : undefined
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


  return {
    fetchUsers,
    createUser,
    deleteUser
  }
}
