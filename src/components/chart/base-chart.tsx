'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Bar,
  BarChart,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { cn } from '@/utils/class-name-merge'

import { Card } from '../ui/card'
import { Divider } from '../ui/divider'
import { CustomTooltip } from './custom-tooltip'

interface ChartDataItem {
  name: string
  value: number
}

interface BaseChartProps {
  title: string
  data: ChartDataItem[]
  barColor: string
  icon: LucideIcon
  iconClassName?: string
  children?: React.ReactNode
}

export function BaseChart({
  title,
  data,
  barColor,
  icon: Icon,
  iconClassName,
  children,
}: BaseChartProps) {
  return (
    <Card className='h-full w-full p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Icon className={cn('h-6 w-6', iconClassName)} />
          <h2 className='text-lg font-semibold'>{title}</h2>
        </div>
        {children}
      </div>

      <Divider className='my-4' />

      <div className='h-30 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            layout='vertical'
            data={data}
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis
              type='number'
              dataKey='value'
              ticks={[0, 2, 4, 6, 8, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#6b7280' }}
            />

            {[0, 2, 4, 6, 8, 10].map((tick) => (
              <ReferenceLine
                key={tick}
                x={tick}
                stroke='#e2e4e9'
                strokeDasharray='3 3'
              />
            ))}

            <YAxis
              dataKey='name'
              type='category'
              width={100}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickMargin={24}
              domain={[0, 10]}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'transparent' }}
            />
            <Bar dataKey='value' fill={barColor} barSize={20}>
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={barColor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
