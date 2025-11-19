'use client'

import { TabSelect } from '@/components/ui/tab-select'
import {
  type Period,
  useReferralsFilterStore,
} from '@/store/referrals-filter-store'

export function ReferralsTabButtons() {
  const { period, setPeriod } = useReferralsFilterStore()

  const filterOptions = [
    {
      label: 'Hoje',
      value: 'today',
      isActive: period === 'today',
    },
    {
      label: 'Na última semana',
      value: 'last_week',
      isActive: period === 'last_week',
    },
    {
      label: 'No último mês',
      value: 'last_month',
      isActive: period === 'last_month',
    },
    {
      label: 'No último ano',
      value: 'last_year',
      isActive: period === 'last_year',
    },
  ]

  return (
    <TabSelect
      buttons={filterOptions.map((option) => ({
        ...option,
        onClick: () => setPeriod(option.value as Period),
      }))}
      className='w-full'
    />
  )
}
