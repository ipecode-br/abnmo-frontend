'use client'

import { useContext } from 'react'
import { useStore } from 'zustand'

import { PermissionsContext } from '@/providers/permissions-provider'

/**
 * Hook to check user permissions and access current user on the client side.
 *
 * @example
 * const { user, canUser } = usePermissions()
 *
 * if (canUser('update:patient')) {
 *   // Show edit button
 * }
 *
 * if (canUser('update:appointment', appointmentId)) {
 *   // Can edit this specific appointment
 * }
 *
 * console.log(user) // Access current user
 */
export function usePermissions() {
  const store = useContext(PermissionsContext)

  if (!store) {
    throw new Error('Missing PermissionsProvider')
  }

  const user = useStore(store, (state) => state.user)
  const canUser = useStore(store, (state) => state.can)

  return { user, canUser }
}
