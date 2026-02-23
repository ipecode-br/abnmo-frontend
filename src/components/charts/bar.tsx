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

// TODO: fix error when there is only one bar
export function BarChart({
  data,
  barColor = 'var(--color-primary)',
}: Readonly<BarChartProps>) {
  const maxLabelLength = Math.max(...data.map((item) => item.label.length))
  const yAxisWidth = Math.max(80, maxLabelLength * 7)

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
          domain={[0, 'dataMax']}
          allowDecimals={false}
        />

        <YAxis
          dataKey='label'
          type='category'
          interval={0}
          tickLine={false}
          width={yAxisWidth}
          axisLine={{ stroke: 'var(--color-border)', strokeWidth: 1 }}
          tick={(props) => {
            const { x, y, payload } = props
            return (
              <text
                x={x || 0}
                y={y || 0}
                dy='0.32em'
                textAnchor='end'
                fontSize='0.75rem'
                fill='var(--color-foreground-soft)'
              >
                {payload.value}
              </text>
            )
          }}
        />

        <Tooltip content={<CustomTooltip />} cursor={false} shared={false} />

        <Bar dataKey='value' fill={barColor} maxBarSize={32} />
      </RechartBarChart>
    </ResponsiveContainer>
  )
}
