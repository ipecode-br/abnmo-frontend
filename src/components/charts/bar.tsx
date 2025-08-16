'use client'

import {
  Bar,
  BarChart as ReBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface BarChartProps {
  data: { name: string; value: number }[]
}

export function BarChart({ data }: BarChartProps) {
  return (
    <ResponsiveContainer width='100%' height={250}>
      <ReBarChart data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='value' fill='#3b82f6' radius={[8, 8, 0, 0]} />
      </ReBarChart>
    </ResponsiveContainer>
  )
}
