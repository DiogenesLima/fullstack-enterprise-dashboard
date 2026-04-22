import type { UserResponse, CreateUserDto, ActionResponse } from '@enterprise/api-contracts'

export const useUsers = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  // Listar usuários
  const fetchUsers = () => useFetch<UserResponse[]>('/users', { baseURL: apiBase })

  // Criar usuário
  const createUser = async (userData: CreateUserDto) => {
    return await $fetch<ActionResponse>('/users', {
      method: 'POST',
      baseURL: apiBase,
      body: userData
    })
  }

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
