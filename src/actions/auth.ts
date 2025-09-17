'use server'

import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import { definePermissionsFor } from '@/lib/permissions'
import type { Action, Subject } from '@/lib/permissions/schemas'

import { getDataFromToken } from './token'

export async function canUser(action: Action, subject: Subject) {
  const data = await getDataFromToken()

  if (!data || !data.userRole) {
    redirect(ROUTES.auth.signOut)
  }

  const { can } = definePermissionsFor(data.userRole)

  return can(action, subject)
}
