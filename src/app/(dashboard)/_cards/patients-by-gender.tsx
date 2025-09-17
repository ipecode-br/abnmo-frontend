import { ChartBarDecreasingIcon } from 'lucide-react'
import type React from 'react'

import { BarChart } from '@/components/charts/bar'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

export function DashboardOverviewPatientsByGender(
  props: Readonly<React.ComponentProps<'div'>>,
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
      className='sm:col-span-3'
      chartClassName='h-30'
      menu={
        <DropdownMenu>
          <DropdownMenuTrigger
            indicator
            size='xs'
            className='gap-1 pr-2'
            aria-label='Abrir menu'
          >
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
