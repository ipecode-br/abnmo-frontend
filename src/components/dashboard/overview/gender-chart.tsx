import { ChartBarDecreasingIcon } from 'lucide-react'

import { BarChart } from '@/components/charts/bar'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

import { DashboardCardChart } from '../cards/chart'

export function DashboardGenderChartCard() {
  // dados do backend
  const data = [
    { name: 'Feminino', value: 10, color: '#008b62' },
    { name: 'Masculino', value: 7, color: '#008b62' },
    { name: 'Outros', value: 5, color: '#008b62' },
  ]

  return (
    <DashboardCardChart
      title='Gênero'
      icon={ChartBarDecreasingIcon}
      chartClassName='h-30'
      menu={
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label='Abrir menu'
            className='rounded-lg'
            indicator
          >
            No último ano
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem>No último mês</DropdownMenuItem>
            <DropdownMenuItem>Na última semana</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    >
      <BarChart data={data} barColor={data[0].color} />
    </DashboardCardChart>
  )
}
