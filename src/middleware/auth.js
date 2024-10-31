const authRoute = '/sellers'

export function auth({ request, redirect, url, locals }, next) {
  const isAuthenticated = true

  console.log('auth middleware')

  if (!isAuthenticated && url.pathname === authRoute) {
    return redirect('/')
  }

  locals.user = 'Pablo'

  next()
}