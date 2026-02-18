'use client'

import { useQuery } from '@tanstack/react-query'
import { ChartPieIcon } from 'lucide-react'

import { PieChart } from '@/components/charts/pie'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { CHART_PIE_COLORS } from '@/constants/charts'
import { type UF, UF_LIST } from '@/enums/shared'
import { api } from '@/lib/api'
import { usePeriodStore } from '@/store/period'

export function TotalAppointmentsByStateCard() {
  const { period } = usePeriodStore()

  const limit = 10
  const withPercentage = true
  const queries = [period, limit, withPercentage]

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.statistics.totalAppointmentsByState, queries],
    queryFn: () =>
      api<{
        states: Array<{ state: UF; total: number; percentage: number }>
        total: number
      }>('/statistics/patients/with-appointments/by-state', {
        params: { period, limit, withPercentage },
      }),
  })

  const states = response?.data?.states ?? []
  const isEmpty = states.length === 0 && !isLoading

  const data = states.map((item, index) => ({
    label: UF_LIST[item.state],
    value: Number(item.percentage),
    color: CHART_PIE_COLORS[index],
  }))

  return (
    <DashboardCardChart title='Localização dos pacientes' icon={ChartPieIcon}>
      <div className='flex h-full min-h-60 items-center justify-center'>
        {isLoading && <Skeleton className='bg-border/75 size-full' />}

        {!isLoading && !isEmpty && (
          <div className='flex size-full items-center gap-6 xl:gap-10'>
            <PieChart
              data={data}
              label='Estados'
              total={response?.data?.total}
              className='size-40'
            />

            <div className='divide-border min-w-0 flex-1 divide-y'>
              {data.map((state) => {
                return (
                  <div
                    key={state.label}
                    className='text-foreground-soft flex items-center gap-2 py-1 text-sm'
                  >
                    <div
                      className='size-2.5 shrink-0 rounded-full'
                      style={{ backgroundColor: state.color }}
                    />
                    <span className='flex-1 truncate'>{state.label}</span>
                    <span className='font-semibold'>{state.value}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {isEmpty && (
          <p className='text-foreground-soft text-sm'>
            Nenhum encaminhamento registrado neste período.
          </p>
        )}
      </div>
    </DashboardCardChart>
  )
}
