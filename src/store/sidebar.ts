import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface SidebarState {
  expanded: boolean
  toggleSidebar: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      expanded: true,

      toggleSidebar() {
        const { expanded } = get()
        set({ expanded: !expanded })
      },
    }),

    {
      name: 'sidebar_expanded',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
