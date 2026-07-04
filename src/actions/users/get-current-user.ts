'use server'

import { api } from '@/lib/api'
import type { User } from '@/types/users.d.ts'

export async function getCurrentUser() {
  const response = await api<User>('/users/me', { cache: 'no-store' })

  if (!response.data) {
    return null
  }

  return response.data
}
