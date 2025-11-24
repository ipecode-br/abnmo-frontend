'use client'

import { useQuery } from '@tanstack/react-query'
import { ChartPieIcon } from 'lucide-react'
import { useState } from 'react'

import { PieChart } from '@/components/charts/pie'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { SelectPeriod } from '@/components/select-period'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { type QueryPeriodType } from '@/types/queries'

export function DashboardOverviewPatientsByCity(
  props: Readonly<React.ComponentProps<'div'>>,
) {
  const [period, setPeriod] = useState<QueryPeriodType>('last-year')

  const limit = 6
  const withPercentage = true
  const queries = [period, limit, withPercentage]

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.dashboard.patientsByCity, queries],
    queryFn: () =>
      api<{
        cities: { city: string; percentage: number }[]
        total: number
      }>('/statistics/patients-by-city', {
        params: { period, limit, withPercentage },
      }),
  })

  const cities = response?.data?.cities ?? []
  const isEmpty = cities.length === 0 && !isLoading

  const PIE_COLORS = [
    '#E255F2',
    '#DF1C41',
    '#0F37E0',
    '#008B62',
    '#F17B2C',
    '#F2AE40',
  ]

  const data = cities.map((item, index) => ({
    label: item.city,
    value: Number(item.percentage),
    color: PIE_COLORS[index],
  }))

  return (
    <DashboardCardChart
      icon={ChartPieIcon}
      title='Cidades'
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
          <div className='flex size-full items-center gap-6 xl:gap-10'>
            <PieChart
              data={data}
              label='cidades'
              total={response?.data?.total}
              className='size-40'
            />

            <div className='divide-border min-w-0 flex-1 divide-y'>
              {data.map((city) => {
                return (
                  <div
                    key={city.label}
                    className='text-foreground-soft flex items-center gap-2 py-1 text-sm'
                  >
                    <div
                      className='size-2.5 shrink-0 rounded-full'
                      style={{ backgroundColor: city.color }}
                    />
                    <span className='flex-1 truncate'>{city.label}</span>
                    <span className='font-semibold'>{city.value}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {isEmpty && (
          <p className='text-foreground-soft text-sm'>
            Nenhuma cidade registrada neste período.
          </p>
        )}
      </div>
    </DashboardCardChart>
  )
}
