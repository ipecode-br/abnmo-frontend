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
import { type Gender, GENDERS } from '@/types/patients'
import { type QueryPeriod } from '@/types/queries'

export function PatientsByGenderCard(
  props: Readonly<React.ComponentProps<'div'>>,
) {
  const [period, setPeriod] = useState<QueryPeriod>('last-year')

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.dashboard.patientsByGender, period],
    queryFn: () =>
      api<{
        genders: { gender: Gender; total: string }[]
        total: number
      }>('/statistics/patients-by-gender', {
        params: { period },
      }),
  })

  const genders = response?.data?.genders ?? []
  const isEmpty = genders.length === 0 && !isLoading

  const data = genders.map((item) => ({
    label: GENDERS[item.gender],
    value: Number(item.total),
  }))

  return (
    <DashboardCardChart
      icon={ChartBarDecreasingIcon}
      title='Gêneros'
      menu={
        <SelectPeriod
          period={period}
          disabled={isLoading}
          onSelect={(value) => setPeriod(value)}
        />
      }
      {...props}
    >
      <div className='flex h-full min-h-44 items-center justify-center'>
        {isLoading && <Skeleton className='bg-border/75 size-full' />}

        {!isLoading && !isEmpty && (
          <div className='size-full min-h-40'>
            <BarChart data={data} />
          </div>
        )}

        {isEmpty && (
          <p className='text-foreground-soft text-sm'>
            Nenhum gênero registrado neste período.
          </p>
        )}
      </div>
    </DashboardCardChart>
  )
}
