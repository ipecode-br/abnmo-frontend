import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { COOKIES } from './constants/cookies'
import { ROUTES } from './constants/routes'

export async function proxy(request: NextRequest) {
  const cookies = request.cookies
  const pathname = request.nextUrl.pathname

  const session = cookies.get(COOKIES.session)
  const isAuthRoute = pathname.startsWith('/conta/')

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL(ROUTES.dashboard.main, request.url))
  }

  if (!isAuthRoute && !session) {
    return NextResponse.redirect(new URL(ROUTES.auth.signIn, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (Next.js API routes)
     * - images (Public image route)
     * - 404 (404 error page)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.png (favicon file)
     */
    '/((?!api|images|404|_next/static|_next/image|icon.png|sitemap.xml|robots.txt|favicon.ico).*)',
  ],
}
