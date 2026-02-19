import { type NextRequest, NextResponse } from 'next/server'

import { COOKIES } from '@/constants/cookies'
import { ROUTES } from '@/constants/routes'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = ROUTES.auth.signIn

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.delete(COOKIES.accessToken)
  response.cookies.delete(COOKIES.refreshToken)

  return response
}
