'use client'

import { useQuery } from '@tanstack/react-query'
import { ChartBarDecreasingIcon } from 'lucide-react'

import { BarChart } from '@/components/charts/bar'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { SPECIALTIES, type Specialty } from '@/enums/shared'
import { api } from '@/lib/api'
import { usePeriodStore } from '@/store/period'

export function TotalAppointmentsByCategoryCard() {
  const { period } = usePeriodStore()

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.statistics.totalAppointmentsByCategory, period],
    queryFn: () =>
      api<{ categories: Array<{ category: Specialty; total: number }> }>(
        '/statistics/appointments/by-category',
        { params: { period } },
      ),
  })

  const categories = response?.data?.categories ?? []
  const isEmpty = categories.length === 0 && !isLoading

  const data = categories.map((item) => ({
    label: SPECIALTIES[item.category],
    value: Number(item.total),
  }))

  return (
    <DashboardCardChart
      title='Atendimentos por categoria'
      icon={ChartBarDecreasingIcon}
    >
      <div className='flex h-full min-h-60 items-center justify-center'>
        {isLoading && <Skeleton className='bg-border/75 size-full' />}

        {!isLoading && !isEmpty && (
          <div className='size-full min-h-40'>
            <BarChart data={data} />
          </div>
        )}

        {isEmpty && (
          <p className='text-foreground-soft text-sm'>
            Nenhum atendimento registrado neste período.
          </p>
        )}
      </div>
    </DashboardCardChart>
  )
}
