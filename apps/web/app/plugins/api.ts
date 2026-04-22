export default defineNuxtPlugin(() => {
  const { token } = useAuth()

  // Intercepts all calls to $fetch (used by useFetch)
  globalThis.$fetch = $fetch.create({
    onRequest({ options }) {
      if (token.value) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token.value}`
        }
      }
    },
    onResponseError({ response }) {
      if (response.status === 401) {
        // If the token has expired or is invalid, log out the user
        const { logout } = useAuth()
        logout()
      }
    }
  })
})
