'use client'

import { SquareKanban } from 'lucide-react'

import { DropdownMenu } from '../ui/dropdown'
import { DropdownMenuContent } from '../ui/dropdown/content'
import { DropdownMenuItem } from '../ui/dropdown/item'
import { DropdownMenuTrigger } from '../ui/dropdown/trigger'
import { BaseChart } from './base-chart'

interface RawData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
  }[]
}

interface GenderChartProps {
  rawData: RawData
}

export function GenderChart({ rawData }: GenderChartProps) {
  const formattedData = rawData.labels.map((label, index) => ({
    name: label,
    value: rawData.datasets[0].data[index],
  }))

  return (
    <BaseChart
      title='Gênero'
      icon={SquareKanban}
      iconClassName='rotate-180 text-foreground-soft'
      data={formattedData}
      barColor='#008b62'
    >
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
    </BaseChart>
  )
}
