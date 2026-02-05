import { create } from 'zustand'

import type { QueryPeriod } from '@/enums/queries'

interface PeriodState {
  period: QueryPeriod
  setPeriod: (period: QueryPeriod) => void
}

export const usePeriodStore = create<PeriodState>((set) => ({
  period: 'today',
  setPeriod: (period) => set({ period }),
}))
