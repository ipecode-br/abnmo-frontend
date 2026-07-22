'use server'

import { DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS } from '@/config/cache'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { api } from '@/lib/api'
import type { User } from '@/types/users.d.ts'

export async function getUser(id: string) {
  const response = await api<User>(`/users/${id}`, {
    cache: 'force-cache',
    next: {
      revalidate: DEFAULT_NEXT_CACHE_REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.user(id)],
    },
  })

  if (!response.data) {
    return null
  }

  return response.data
}
