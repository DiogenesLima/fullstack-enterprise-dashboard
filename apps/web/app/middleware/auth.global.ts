export default defineNuxtRouteMiddleware((to) => {
  const localePath = useLocalePath()
  const { isAuthenticated } = useAuth()

  // List of routes that do NOT require authentication.
  const publicRoutes = [localePath('/login')]

  // If the user is not authenticated and tries to access a protected route
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo(localePath('/login'))
  }

  // If the user is authenticated and tries to access the login page, redirect to dashboard
  if (isAuthenticated.value && to.path === localePath('/login')) {
    return navigateTo(localePath('/dashboard'))
  }
})
