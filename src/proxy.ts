import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { deleteCookie } from './actions/cookies'
import { env } from './config/env'
import { COOKIES } from './constants/cookies'
import { ROUTES } from './constants/routes'

export async function proxy(request: NextRequest) {
  const cookies = request.cookies
  const pathname = request.nextUrl.pathname

  const accessToken = cookies.get(COOKIES.accessToken)
  const refreshToken = cookies.get(COOKIES.refreshToken)
  const isAuthRoute = pathname.startsWith('/conta')

  if (refreshToken && !accessToken) {
    const url = new URL('/refresh-token', env.NEXT_PUBLIC_API_URL)

    const response = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Cookie: `refresh_token=${refreshToken.value}`,
      },
    })

    if (!response.ok) {
      await deleteCookie(COOKIES.accessToken)
      await deleteCookie(COOKIES.refreshToken)
      return NextResponse.redirect(new URL(ROUTES.auth.signIn, request.url))
    }

    const setCookie = response.headers.get('set-cookie')
    const nextResponse = NextResponse.redirect(request.nextUrl)

    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie)
    }

    return nextResponse
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL(ROUTES.dashboard.main, request.url))
  }

  if (!isAuthRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL(ROUTES.auth.signIn, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - images (Public image route)
     * - 404 (404 error page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.png (favicon file)
     */
    '/((?!images|404|_next/static|_next/image|icon.png|sitemap.xml|robots.txt|favicon.ico).*)',
  ],
}
