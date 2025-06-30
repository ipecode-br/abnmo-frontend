import { create } from 'zustand'

interface SidebarState {
  expanded: boolean
  toogleSidebar: () => void
}

export const useSidebar = create<SidebarState>((set, get) => {
  return {
    expanded: true,

    toogleSidebar() {
      const { expanded } = get()
      set({ expanded: !expanded })
    },
  }
})
