'use server'

import type { Feature } from '@/enums/features'
import { can } from '@/lib/can'

import { getCurrentUser } from '../users/get-current-user'

/**
 * Server action to check user permissions by feature.
 *
 * @example
 * const canViewUsers = await canUser('read:user')
 * const canUpdateAppointment = await canUser('update:appointment', appointmentId)
 */
export async function canUser(
  feature: Feature | Feature[],
  compareToId?: string | string[],
) {
  const user = await getCurrentUser()

  if (!user) {
    return false
  }

  return can(user, feature, compareToId)
}
