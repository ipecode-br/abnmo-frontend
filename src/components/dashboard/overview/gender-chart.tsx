import { ChartBarDecreasingIcon } from 'lucide-react'

import { BarChart } from '@/components/charts/bar'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

import { DashboardCardChart } from '../cards/chart'

export function DashboardGenderChartCard() {
  const data = [
    { name: 'Feminino', value: 10 },
    { name: 'Masculino', value: 7 },
    { name: 'Outros', value: 5 },
  ]

  return (
    <DashboardCardChart
      title='Gênero'
      icon={ChartBarDecreasingIcon}
      chartClassName='h-30'
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
      <BarChart data={data} />
    </DashboardCardChart>
  )
}
