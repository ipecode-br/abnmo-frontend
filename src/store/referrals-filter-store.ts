import { create } from 'zustand'

export type Period = 'today' | 'last_week' | 'last_month' | 'last_year'

interface ReferralsFilterState {
  period: Period
  setPeriod: (period: Period) => void
}

export const useReferralsFilterStore = create<ReferralsFilterState>((set) => ({
  period: 'today',
  setPeriod: (period) => set({ period }),
}))
