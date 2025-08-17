import { ChartPie } from 'lucide-react'
import type { HTMLAttributes } from 'react'

import { ChartSummary } from '@/components/charts/cities-chart/chart-summary'
import { Cities } from '@/components/charts/cities-chart/cities'
import { PieChart } from '@/components/charts/cities-chart/pie'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

import { DashboardCardChart } from '../cards/chart'

type DashboardCitiesChartCardProps = HTMLAttributes<HTMLDivElement>

export function DashboardCitiesChartCard(
  props: Readonly<DashboardCitiesChartCardProps>,
) {
  const citiesData = [
    { name: 'Recife', percentage: 35 },
    { name: 'Rio de Janeiro', percentage: 30 },
    { name: 'São Paulo', percentage: 20 },
    { name: 'Curitiba', percentage: 7 },
    { name: 'Manaus', percentage: 5 },
    { name: 'Ceará', percentage: 3 },
  ]

  const PIE_COLORS = [
    '#E255F2',
    '#DF1C41',
    '#0F37E0',
    '#008B62',
    '#F17B2C',
    '#F2AE40',
  ]

  const data = citiesData.map((item, index) => ({
    ...item,
    color: PIE_COLORS[index % PIE_COLORS.length],
  }))

  return (
    <DashboardCardChart
      title='Cidades'
      icon={ChartPie}
      chartClassName='h-full'
      menu={
        <DropdownMenu>
          <DropdownMenuTrigger aria-label='Abrir menu' size='sm'>
            No último ano
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem>No último mês</DropdownMenuItem>
            <DropdownMenuItem>Na última semana</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
      {...props}
    >
      <div className='flex w-full items-end gap-4'>
        <div className='relative h-30 w-40'>
          <PieChart data={data} />
          <ChartSummary label='cidades' value={data.length} />
        </div>
        <div className='flex-1'>
          <Cities data={data} />
        </div>
      </div>
    </DashboardCardChart>
  )
}
