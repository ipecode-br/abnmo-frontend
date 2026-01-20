'use server'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import { definePermissionsFor } from '@/lib/permissions'
import type { Action, Subject } from '@/lib/permissions/schemas'

import { getUserFromToken } from './token'

export async function canUser(action: Action, subject: Subject) {
  const data = await getUserFromToken()

  if (!data || !data.role) {
    redirect(ROUTES.auth.signOut)
  }

  const { can } = definePermissionsFor(data.role)

  return can(action, subject)
}
