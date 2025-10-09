'use client'
import { useQuery } from '@tanstack/react-query'
import { ChartBarDecreasingIcon } from 'lucide-react'
import { useState } from 'react'

import { BarChart } from '@/components/charts/bar'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { SelectPeriod } from '@/components/select-period'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { GENDERS, type GenderType } from '@/types/patients'
import { type QueryPeriodType } from '@/types/queries'

export function DashboardOverviewPatientsByGender(
  props: Readonly<React.ComponentProps<'div'>>,
) {
  const [period, setPeriod] = useState<QueryPeriodType>('last-year')

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.dashboard.patientsByGender, period],
    queryFn: () =>
      api<{
        genders: { gender: GenderType; total: string }[]
        total: number
      }>('/statistics/patients-by-gender', {
        params: { period },
      }),
  })

  const genders = response?.data?.genders ?? []

  const data = genders.map((item) => ({
    label: GENDERS[item.gender],
    value: Number(item.total),
  }))

  if (isLoading) {
    return (
      <Skeleton className='bg-border/75 min-h-52 rounded-2xl sm:col-span-3' />
    )
  }

  return (
    <DashboardCardChart
      title='Gênero'
      icon={ChartBarDecreasingIcon}
      className='sm:col-span-3'
      menu={
        <SelectPeriod period={period} onSelect={(value) => setPeriod(value)} />
      }
      {...props}
    >
      <div className='h-48 w-full'>
        <BarChart data={data} />
      </div>
    </DashboardCardChart>
  )
}
