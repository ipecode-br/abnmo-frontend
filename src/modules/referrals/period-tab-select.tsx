'use client'

import { TabSelect } from '@/components/ui/tab-select'
import type { QueryPeriod } from '@/enums/queries'
import { usePeriodStore } from '@/store/period'

export function ReferralsPeriodTabSelect() {
  const { period, setPeriod } = usePeriodStore()

  const options: Array<{ label: string; value: QueryPeriod }> = [
    { label: 'Hoje', value: 'today' },
    { label: 'Na última semana', value: 'last-week' },
    { label: 'No último mês', value: 'last-month' },
    { label: 'No último ano', value: 'last-year' },
  ]

  return (
    <TabSelect<QueryPeriod>
      value={period}
      options={options}
      onSelect={(value) => setPeriod(value)}
      className='col-span-full max-sm:h-36 max-sm:flex-col'
    />
  )
}
