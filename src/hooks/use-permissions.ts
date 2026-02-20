'use client'

import { useContext } from 'react'
import { useStore } from 'zustand'

import { PermissionsContext } from '@/lib/permissions/provider'

/**
 * Hook to check user permissions on the client side
 *
 * @example
 * const { canUser } = usePermissions()
 *
 * if (canUser('update', 'Patients')) {
 *   // Show edit button
 * }
 */
export function usePermissions() {
  const store = useContext(PermissionsContext)

  if (!store) {
    throw new Error('Missing PermissionsProvider')
  }

  const canUser = useStore(store, (state) => state.can)

  return { canUser }
}
