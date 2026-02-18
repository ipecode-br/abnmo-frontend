'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardCheckIcon } from 'lucide-react'

import { SummaryCard } from '@/components/summary-card'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { usePeriodStore } from '@/store/period'

export function TotalAppointmentsCard() {
  const { period } = usePeriodStore()

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.statistics.totalAppointments, period],
    queryFn: () =>
      api<{ total: number }>('/statistics/appointments/total', {
        params: { period },
      }),
  })

  return (
    <SummaryCard
      icon={ClipboardCheckIcon}
      label='Atendimentos'
      value={response?.data?.total}
      className='sm:col-span-1'
      loading={isLoading}
    />
  )
}
