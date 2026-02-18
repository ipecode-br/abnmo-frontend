'use server'

import { redirect } from 'next/navigation'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { COOKIES } from '@/constants/cookies'
import { ROUTES } from '@/constants/routes'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'

import { deleteCookie, getCookie } from '../cookies'
import { getUserFromToken } from '../users/get-user-from-token'

export async function logout() {
  const refreshToken = await getCookie(COOKIES.refreshToken)
  const user = await getUserFromToken()

  if (refreshToken) {
    await api('/logout', { method: 'POST', includeCookies: true })
    await deleteCookie(COOKIES.refreshToken)
    if (user?.id) {
      revalidateServerCache(NEXT_CACHE_TAGS.user(user.id))
    }
  }

  await deleteCookie(COOKIES.accessToken)

  revalidateClientCache('all')

  redirect(ROUTES.auth.signIn)
}
