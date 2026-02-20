import { createStore } from 'zustand'

import { definePermissionsFor } from '@/lib/permissions'
import type { Action, Role, Subject } from '@/lib/permissions/schemas'

type User = { id: string; role: Role }

export type PermissionsState = {
  user?: User | null
}

export type PermissionsStore = PermissionsState & {
  can: (action: Action, subject: Subject) => boolean
  setPermissions: (user?: User) => void
}

export function createPermissionsStore(initState: PermissionsState) {
  return createStore<PermissionsStore>((set, get) => ({
    ...initState,

    can: (action, subject) => {
      const { user } = get()

      if (!user) return false

      return definePermissionsFor(user.role).can(action, subject)
    },

    setPermissions: (user) => set({ user }),
  }))
}
