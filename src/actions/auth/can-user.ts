'use server'

import { definePermissionsFor } from '@/lib/permissions'
import type { Action, Subject } from '@/lib/permissions/schemas'

import { getUserFromToken } from '../users/get-user-from-token'

/**
 * Action to check user permissions on the server side
 *
 * @example
 * const canUpdatePatients = await canUser('update', 'Patients'
 */
export async function canUser(action: Action, subject: Subject) {
  const user = await getUserFromToken()

  if (!user || !user.role) {
    return false
  }

  const { can } = definePermissionsFor(user.role)

  return can(action, subject)
}
