// OAuth handler for Auth0 using nuxt-auth-utils
// This single endpoint handles both: redirect to Auth0 (no ?code) and the callback (with ?code)

export default defineOAuthAuth0EventHandler({
  config: {
    // Environment variables are used by default (see README of nuxt-auth-utils)
    // Add common OIDC scopes so we get basic profile info
    scope: ['openid', 'profile', 'email']
    // audience: process.env.NUXT_OAUTH_AUTH0_AUDIENCE, // optional, only if you call a protected API
  },
  async onSuccess(event, { user /* , tokens */ }) {
    // Persist minimal user info to the session (HTTP-only cookie managed by nuxt-auth-utils)
    await setUserSession(event, { user })

    // Redirect back to original page if provided
    const { returnTo } = getQuery(event)
    const target = typeof returnTo === 'string' && returnTo.length > 0 ? returnTo : '/'
    return sendRedirect(event, target)
  },
  async onError(event, error) {
    console.error('[auth0] OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
