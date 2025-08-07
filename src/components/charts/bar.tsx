'use client'

import {
  Bar,
  BarChart as RechartBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { CustomTooltip } from './custom-tooltip'

interface ChartDataItem {
  name: string
  value: number
}

interface BarChartProps {
  data: ChartDataItem[]
  barColor?: string
}

export function BarChart({
  data,
  barColor = 'var(--color-primary)',
}: Readonly<BarChartProps>) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartBarChart data={data} layout='vertical'>
        <CartesianGrid
          horizontal={false}
          strokeDasharray='4 2'
          stroke='var(--color-border)'
        />

        <XAxis
          type='number'
          dataKey='value'
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: 'var(--color-disabled)' }}
          tickMargin={8}
        />

        <YAxis
          dataKey='name'
          type='category'
          width='auto'
          tick={{ fontSize: 12, fill: 'var(--color-foreground-soft)' }}
          tickMargin={8}
          tickLine={false}
          axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
        />

        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

        <Bar dataKey='value' fill={barColor} barSize={20} />
      </RechartBarChart>
    </ResponsiveContainer>
  )
}
