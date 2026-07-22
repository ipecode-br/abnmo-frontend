'use client'

import { createContext, useState } from 'react'

import {
  createPermissionsStore,
  type PermissionsState,
} from '@/store/permissions'

export const PermissionsContext = createContext<ReturnType<
  typeof createPermissionsStore
> | null>(null)

interface PermissionsProviderProps {
  children: React.ReactNode
  initialState: PermissionsState
}

export function PermissionsProvider({
  children,
  initialState,
}: Readonly<PermissionsProviderProps>) {
  const [store] = useState(() => createPermissionsStore(initialState))

  return (
    <PermissionsContext.Provider value={store}>
      {children}
    </PermissionsContext.Provider>
  )
}
