import { create } from 'zustand'

export type Period = 'today' | 'last_week' | 'last_month' | 'last_year'

interface PeriodState {
  period: Period
  setPeriod: (period: Period) => void
}

export const usePeriodStore = create<PeriodState>((set) => ({
  period: 'today',
  setPeriod: (period) => set({ period }),
}))
