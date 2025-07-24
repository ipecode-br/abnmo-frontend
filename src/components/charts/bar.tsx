'use client'

import {
  Bar,
  BarChart as RechartBarChart,
  Cell,
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

interface BaseChartProps {
  data: ChartDataItem[]
  barColor?: string
}

export function BarChart({ data, barColor }: BaseChartProps) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartBarChart
        layout='vertical'
        data={data}
        margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
      >
        <XAxis
          type='number'
          dataKey='value'
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: '#6b7280' }}
        />

        <YAxis
          dataKey='name'
          type='category'
          width={100}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          tickMargin={6}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
        <Bar dataKey='value' fill={barColor} barSize={20}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={barColor} />
          ))}
        </Bar>
      </RechartBarChart>
    </ResponsiveContainer>
  )
}
