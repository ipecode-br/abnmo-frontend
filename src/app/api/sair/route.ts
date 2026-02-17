import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { COOKIES } from '@/constants/cookies'
import { ROUTES } from '@/constants/routes'

export async function POST(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = ROUTES.auth.signIn

  const cookieStore = await cookies()
  cookieStore.delete(COOKIES.accessToken)

  return NextResponse.redirect(redirectUrl)
}
