const oldRoute = '/old-route'

export function redirections({ request, redirect, url }, next) {
  if (url.pathname === oldRoute) {
    return redirect('/new-route')
  }

  next()
}