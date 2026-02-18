'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { env } from '@/config/env'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { COOKIES } from '@/constants/cookies'
import { ROUTES } from '@/constants/routes'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'

import { getCookie } from './cookies'
import { getUserFromToken } from './users/get-user-from-token'

export async function logout() {
  const cookieStore = await cookies()
  const refreshToken = await getCookie(COOKIES.refreshToken)

  const user = await getUserFromToken()

  if (refreshToken) {
    try {
      await api('/logout', { method: 'POST', includeCookies: true })
      revalidateServerCache(NEXT_CACHE_TAGS.user(user?.id || ''))
    } catch (error) {
      console.error('Logout API error:', error)
    }
  }

  cookieStore.delete({
    name: COOKIES.accessToken,
    path: '/',
    domain: `.${env.NEXT_PUBLIC_DOMAIN}`,
  })
  cookieStore.delete({
    name: COOKIES.refreshToken,
    path: '/',
    domain: `.${env.NEXT_PUBLIC_DOMAIN}`,
  })

  revalidateClientCache('all')

  redirect(ROUTES.auth.signIn)
}
