'use server'

import { redirect } from 'next/navigation'

import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import type { User } from '@/types/users.d.ts'

import { getUserFromToken } from './token'

export async function getCurrentUser() {
  const REVALIDATE_IN_SECONDS = 3600

  const user = await getUserFromToken()

  if (!user?.id) return null

  const response = await api<User>('/users/me', {
    includeCookies: true,
    cache: 'force-cache',
    next: {
      revalidate: REVALIDATE_IN_SECONDS,
      tags: [NEXT_CACHE_TAGS.user(user.id)],
    },
  })

  if (!response.success) {
    redirect(ROUTES.auth.signOut)
  }

  return response.data
}
