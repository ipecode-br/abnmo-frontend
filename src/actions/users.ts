'use server'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { UserType } from '@/types/users'

import { getDataFromToken } from './token'

export async function getProfile() {
  const REVALIDATE_IN_SECONDS = 3600

  const data = await getDataFromToken()

  if (!data?.userId) return null

  const response = await api<UserType>('/users/profile', {
    includeCookies: true,
    cache: 'force-cache',
    next: {
      revalidate: REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.user(data.userId)],
    },
  })

  return response.data
}
