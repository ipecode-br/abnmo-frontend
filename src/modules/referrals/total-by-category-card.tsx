'use client'

import { useQuery } from '@tanstack/react-query'
import { ChartBarDecreasingIcon } from 'lucide-react'

import { BarChart } from '@/components/charts/bar'
import { ChartCard } from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { SPECIALTIES, type Specialty } from '@/enums/shared'
import { api } from '@/lib/api'
import { usePeriodStore } from '@/store/period'

export function TotalReferralsByCategoryCard() {
  const { period } = usePeriodStore()

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.statistics.totalReferralsByCategory, period],
    queryFn: () =>
      api<{ categories: Array<{ category: Specialty; total: number }> }>(
        '/statistics/referrals/by-category',
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
    <ChartCard
      title='Encaminhamentos por categoria'
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
            Nenhum encaminhamento registrado neste período.
          </p>
        )}
      </div>
    </ChartCard>
  )
}
