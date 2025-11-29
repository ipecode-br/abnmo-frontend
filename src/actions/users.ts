'use server'

import { redirect } from 'next/navigation'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import type { User } from '@/types/users'

import { getDataFromToken } from './token'

export async function getProfile() {
  const REVALIDATE_IN_SECONDS = 3600

  const data = await getDataFromToken()

  if (!data?.userId) return null

  const response = await api<User>('/users/profile', {
    includeCookies: true,
    cache: 'force-cache',
    next: {
      revalidate: REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.user(data.userId)],
    },
  })

  if (!response.success) {
    redirect(ROUTES.auth.signOut)
  }

  return response.data
}
