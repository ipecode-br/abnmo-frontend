'use client'

import { useContext } from 'react'
import { useStore } from 'zustand'

import { PermissionsContext } from '@/lib/permissions/provider'

/**
 * Hook to check user permissions and access current user on the client side
 *
 * @example
 * const { user, canUser } = usePermissions()
 *
 * if (canUser('update', 'Patients')) {
 *   // Show edit button
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
