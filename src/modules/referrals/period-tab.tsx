'use client'

import { TabSelect } from '@/components/ui/tab-select'
import { usePeriodStore } from '@/store/period'

export function ReferralsPeriodTab() {
  const { period, setPeriod } = usePeriodStore()

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
  ] as const

  return (
    <TabSelect
      buttons={filterOptions.map((option) => ({
        label: option.label,
        isActive: option.value === period,
        onClick: () => setPeriod(option.value),
      }))}
      className='col-span-full'
    />
  )
}
