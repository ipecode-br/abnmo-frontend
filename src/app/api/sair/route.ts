import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

import { ROUTES } from '@/constants/routes'

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = ROUTES.auth.signIn

  const cookieStore = await cookies()
  cookieStore.delete('access_token')

  return NextResponse.redirect(redirectUrl)
}
