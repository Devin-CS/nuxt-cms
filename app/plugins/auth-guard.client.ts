export default defineNuxtPlugin((nuxtApp) => {
  const router = nuxtApp.$router

  router.beforeEach(async (to) => {
    // Only guard routes that explicitly opt-in
    if (to.meta?.requiresAuth !== true) {
      return true
    }

    const { ready, loggedIn, fetch } = useUserSession()
    if (!ready.value) {
      await fetch()
    }

    if (!loggedIn.value) {
      // Use hard redirect so Auth0 flow leaves SPA cleanly
      const returnTo = to.fullPath || '/'
      window.location.href = `/api/auth/auth0?returnTo=${encodeURIComponent(returnTo)}`
      return false
    }

    return true
  })
})
