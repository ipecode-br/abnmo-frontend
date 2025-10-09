'use client'
import { useQuery } from '@tanstack/react-query'
import { ChartPie } from 'lucide-react'
import { useState } from 'react'

import { ChartSummary } from '@/components/charts/cities-chart/chart-summary'
import { Cities } from '@/components/charts/cities-chart/cities'
import { PieChart } from '@/components/charts/cities-chart/pie'
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

  if (isLoading) {
    return <Skeleton className='bg-border/75 rounded-2xl sm:col-span-3' />
  }

  return (
    <DashboardCardChart
      icon={ChartPie}
      title='Cidades'
      className='sm:col-span-3'
      chartClassName='h-full'
      menu={
        <SelectPeriod period={period} onSelect={(value) => setPeriod(value)} />
      }
      {...props}
    >
      <div className='flex w-full items-end gap-4'>
        <div className='relative h-30 w-40'>
          <PieChart data={data} />
          <ChartSummary label='cidades' value={response?.data?.total ?? 0} />
        </div>
        <div className='flex-1'>
          <Cities data={data} />
        </div>
      </div>
    </DashboardCardChart>
  )
}
