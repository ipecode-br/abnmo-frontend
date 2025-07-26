'use server'

import jwt from 'jsonwebtoken'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'

import { getCookie } from './cookies'

export async function getProfile() {
  const REVALIDATE_IN_SECONDS = 3600

  const accessTokenCookie = await getCookie('access_token')

  if (!accessTokenCookie) return null

  // Extract user ID from JWT signed cookie
  const tokenWithoutPrefix = accessTokenCookie.value.slice(2)
  const extractedToken = tokenWithoutPrefix.split('.').slice(0, 3).join('.')
  const payload = jwt.decode(extractedToken) as { sub: string } | null
  const userId = payload?.sub

  if (!userId) return null

  const response = await api('/users/profile', {
    includeCookies: true,
    cache: 'force-cache',
    next: {
      revalidate: REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.user(userId)],
    },
  })

  return response.data
}
