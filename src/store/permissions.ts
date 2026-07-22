import { createStore } from 'zustand'

import type { Feature } from '@/enums/features'
import { can } from '@/lib/can'
import type { User } from '@/types/users.d.ts'

export type PermissionsState = {
  user?: User | null
}

export type PermissionsStore = PermissionsState & {
  can: (
    feature: Feature | Feature[],
    compareToId?: string | string[],
  ) => boolean
  setPermissions: (user?: User | null) => void
}

export function createPermissionsStore(initState: PermissionsState) {
  return createStore<PermissionsStore>((set, get) => ({
    ...initState,

    can: (feature, compareToId) => {
      const { user } = get()

      if (!user) return false

      return can(user, feature, compareToId)
    },

    setPermissions: (user) => set({ user }),
  }))
}
