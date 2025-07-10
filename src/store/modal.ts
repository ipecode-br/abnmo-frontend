import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useModal = create<ModalState>((set) => {
  return {
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }
})
