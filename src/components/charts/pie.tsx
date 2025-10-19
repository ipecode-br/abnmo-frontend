'use client'

import {
  Cell,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
} from 'recharts'

import { cn } from '@/utils/class-name-merge'

interface ChartDataItem {
  label: string
  value: number
  color: string
}

interface PieChartProps extends Readonly<React.ComponentProps<'div'>> {
  data: ChartDataItem[]
  total?: number
  label?: string
}

export function PieChart({
  data,
  total = 0,
  label,
  className,
  ...props
}: Readonly<PieChartProps>) {
  return (
    <div
      className={cn(
        'relative flex aspect-square w-full shrink-0 items-center justify-center',
        className,
      )}
      {...props}
    >
      <ResponsiveContainer
        width='100%'
        height='100%'
        className='[&_path]:outline-none [&_svg]:outline-none'
      >
        <RechartPieChart>
          <Pie
            cx='50%'
            cy='50%'
            data={data}
            dataKey='value'
            endAngle={-270}
            startAngle={90}
            paddingAngle={2}
            innerRadius='80%'
            outerRadius='105%'
            animationBegin={100}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.label}`} fill={entry.color} />
            ))}
          </Pie>
        </RechartPieChart>
      </ResponsiveContainer>

      {label && (
        <div className='absolute text-center'>
          <p className='text-3xl leading-none font-semibold'>{total}</p>
          <p className='text-foreground-soft text-sm font-medium uppercase'>
            {label}
          </p>
        </div>
      )}
    </div>
  )
}
