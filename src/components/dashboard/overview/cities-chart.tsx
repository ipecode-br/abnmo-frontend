import { ChartPie } from 'lucide-react'

import { Cities } from '@/components/charts/cities-chart/cities'
import { PieChart } from '@/components/charts/cities-chart/pie'
import { PieCities } from '@/components/charts/cities-chart/pie-cities'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

import { DashboardCardChart } from '../cards/chart'

export function DashboardCitiesChartCard() {
  const citiesData = [
    { city: 'Recife', percentage: 35 },
    { city: 'Rio de Janeiro', percentage: 30 },
    { city: 'São Paulo', percentage: 20 },
    { city: 'Curitiba', percentage: 7 },
    { city: 'Manaus', percentage: 5 },
    { city: 'Ceará', percentage: 3 },
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
      className='col-span-1 md:col-span-3'
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
    >
      <div className='flex w-full items-end gap-4'>
        <div className='relative h-30 w-40'>
          <PieChart data={data} />
          <PieCities count={citiesData.length} />
        </div>
        <div className='flex-1'>
          <Cities data={data} />
        </div>
      </div>
    </DashboardCardChart>
  )
}
