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
  label: string
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
  const maxLabelLength = Math.max(...data.map((item) => item.label.length))
  const yAxisWidth = Math.max(80, Math.min(maxLabelLength * 6.5, 180))

  return (
    <ResponsiveContainer className='[&_svg]:outline-none'>
      <RechartBarChart
        data={data}
        layout='vertical'
        margin={{ top: 0, right: 0, bottom: -6, left: 0 }}
      >
        <CartesianGrid
          horizontal={false}
          strokeDasharray='4 2'
          stroke='var(--color-border)'
        />

        <XAxis
          type='number'
          dataKey='value'
          tickMargin={8}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: '0.75rem', fill: 'var(--color-disabled)' }}
        />

        <YAxis
          dataKey='label'
          type='category'
          interval={0}
          tickLine={false}
          width={yAxisWidth}
          axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
          tick={(props) => {
            const { x = 0, y = 0, payload } = props

            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  dy={4}
                  textAnchor='end'
                  fontSize='0.75rem'
                  style={{ whiteSpace: 'nowrap' }}
                  fill='var(--color-foreground-soft)'
                >
                  {payload?.value}
                </text>
              </g>
            )
          }}
        />

        <Tooltip content={<CustomTooltip />} cursor={false} shared={false} />

        <Bar dataKey='value' fill={barColor} />
      </RechartBarChart>
    </ResponsiveContainer>
  )
}
