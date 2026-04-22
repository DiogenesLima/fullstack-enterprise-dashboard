export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  // List of routes that do NOT require authentication.
  const publicRoutes = ['/login']

  // If the user is not authenticated and tries to access a protected route
  if (!isAuthenticated.value && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // If the user is authenticated and tries to access the login page, redirect to dashboard
  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/users')
  }
})
