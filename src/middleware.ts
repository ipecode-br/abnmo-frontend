import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getRoutes } from '@/constants/routes'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const routes = getRoutes()

  if (pathname === '/') {
    return NextResponse.redirect(new URL(routes.auth.signIn, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - images (Public image route)
     * - 404 (404 error page)
     * - conta (Auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.png (favicon file)
     */
    '/((?!images|404|conta|_next/static|_next/image|icon.png|sitemap.xml|robots.txt|favicon.ico).*)',
  ],
}
