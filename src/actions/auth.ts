'use server'

import { definePermissionsFor } from '@/lib/permissions'
import type { Action, Subject } from '@/lib/permissions/schemas'

import { getDataFromToken } from './token'

export async function canUser(action: Action, subject: Subject) {
  // TODO: remove it when integrations is completed
  if (process.env.BYPASS_AUTH === 'true') {
    return true
  }

  const data = await getDataFromToken()

  if (!data?.userRole) return null

  const { can } = definePermissionsFor(data.userRole)

  return can(action, subject)
}
