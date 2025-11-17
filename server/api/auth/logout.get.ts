export default eventHandler(async (event) => {
  await clearUserSession(event)

  // Optional: also log out from Auth0 and return to site
  const domain = process.env.NUXT_OAUTH_AUTH0_DOMAIN
  const clientId = process.env.NUXT_OAUTH_AUTH0_CLIENT_ID || ''
  const origin = `${getRequestProtocol(event)}://${getRequestHost(event)}`
  const query = getQuery(event)
  let returnTo = (query.returnTo as string) || origin

  // Auth0 requires an absolute returnTo URL that matches Allowed Logout URLs.
  // If a relative path like "/" is provided, normalize it to the current origin.
  if (returnTo.startsWith('/')) {
    returnTo = origin + returnTo
  } else if (/^https?:\/\//i.test(returnTo)) {
    // Prevent open-redirects to other domains: force same-origin
    if (!returnTo.startsWith(origin)) {
      returnTo = origin
    }
  } else {
    // Any other non-url value -> fallback to origin
    returnTo = origin
  }

  // Hardening: Always return to the site root. This avoids needing to enumerate
  // every path in Auth0 Allowed Logout URLs (both locally and in production).
  // If you ever want to allow deep-link returns, add those full URLs in Auth0
  // and remove this override.
  returnTo = origin

  // Local development convenience: skip Auth0 federated logout on localhost to
  // avoid Auth0 Allowed Logout URL mismatches during dev. We'll just clear the
  // local session and return to the app root. Production will still go through
  // Auth0 to fully terminate the IdP session.
  const host = getRequestHost(event)
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) {
    return sendRedirect(event, origin)
  }

  if (domain) {
    const url = new URL(`https://${domain}/v2/logout`)
    url.searchParams.set('returnTo', returnTo)
    if (clientId) url.searchParams.set('client_id', clientId)
    return sendRedirect(event, url.toString())
  }

  return sendRedirect(event, returnTo)
})
