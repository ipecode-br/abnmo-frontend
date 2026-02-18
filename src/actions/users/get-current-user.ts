'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { User } from '@/types/users.d.ts'

import { getUserFromToken } from './get-user-from-token'

export async function getCurrentUser() {
  const user = await getUserFromToken()

  if (!user) return null

  const response = await api<User>('/users/me', {
    cache: 'force-cache',
    next: {
      revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.user(user.id)],
    },
  })

  if (!response.success) {
    return null
  }

  return response.data
}
