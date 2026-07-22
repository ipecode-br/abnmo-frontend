'use server'

import { redirect } from 'next/navigation'

import { COOKIES } from '@/constants/cookies'
import { ROUTES } from '@/constants/routes'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { api } from '@/lib/api'

import { deleteCookie } from '../cookies'

export async function logout() {
  await api('/logout', { method: 'POST' })

  await Promise.all([
    deleteCookie(COOKIES.session),
    deleteCookie(COOKIES.cdnKeyPairId),
    deleteCookie(COOKIES.cdnPolicy),
    deleteCookie(COOKIES.cdnSignature),
  ])

  revalidateClientCache('all')

  redirect(ROUTES.auth.signIn)
}
