'use server'

import { definePermissionsFor } from '@/lib/permissions'
import type { Action, Subject } from '@/lib/permissions/schemas'

import { getDataFromToken } from './token'

export async function canUser(action: Action, subject: Subject) {
  const data = await getDataFromToken()

  if (!data?.userRole) return null

  const { can } = definePermissionsFor(data.userRole)

  return can(action, subject)
}
