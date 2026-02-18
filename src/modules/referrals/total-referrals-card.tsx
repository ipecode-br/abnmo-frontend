'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardPasteIcon } from 'lucide-react'

import { SummaryCard } from '@/components/summary-card'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { usePeriodStore } from '@/store/period'

export function TotalReferralsCard() {
  const { period } = usePeriodStore()

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.statistics.totalReferrals, period],
    queryFn: () =>
      api<{ total: number }>('/statistics/referrals/total', {
        params: { period },
      }),
  })

  return (
    <SummaryCard
      icon={ClipboardPasteIcon}
      label='Encaminhamentos'
      value={response?.data?.total}
      className='sm:col-span-1'
      loading={isLoading}
    />
  )
}
