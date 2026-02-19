import { type NextRequest, NextResponse } from 'next/server'

import { env } from '@/config/env'
import { COOKIES } from '@/constants/cookies'
import { ROUTES } from '@/constants/routes'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = ROUTES.auth.signIn

  const response = NextResponse.redirect(redirectUrl)

  response.cookies.delete({
    name: COOKIES.accessToken,
    path: '/',
    domain: `.${env.NEXT_PUBLIC_DOMAIN}`,
  })
  response.cookies.delete({
    name: COOKIES.refreshToken,
    path: '/',
    domain: `.${env.NEXT_PUBLIC_DOMAIN}`,
  })

  return response
}
