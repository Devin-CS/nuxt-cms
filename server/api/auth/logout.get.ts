export default eventHandler(async (event) => {
  await clearUserSession(event)

  // Optional: also log out from Auth0 and return to site
  const domain = process.env.NUXT_OAUTH_AUTH0_DOMAIN
  const clientId = process.env.NUXT_OAUTH_AUTH0_CLIENT_ID || ''
  const origin = `${getRequestProtocol(event)}://${getRequestHost(event)}`
  const returnTo = (getQuery(event).returnTo as string) || origin

  if (domain) {
    const url = new URL(`https://${domain}/v2/logout`)
    url.searchParams.set('returnTo', returnTo)
    if (clientId) url.searchParams.set('client_id', clientId)
    return sendRedirect(event, url.toString())
  }

  return sendRedirect(event, returnTo)
})
