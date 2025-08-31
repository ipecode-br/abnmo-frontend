import { ChartBarDecreasingIcon } from 'lucide-react'
import type { HTMLAttributes } from 'react'

import { BarChart } from '@/components/charts/bar'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

type DashboardGenderChartCardProps = HTMLAttributes<HTMLDivElement>

export function DashboardGenderChartCard(
  props: Readonly<DashboardGenderChartCardProps>,
) {
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
      <div className='h-30 w-full'>
        <BarChart data={data} />
      </div>
    </DashboardCardChart>
  )
}
