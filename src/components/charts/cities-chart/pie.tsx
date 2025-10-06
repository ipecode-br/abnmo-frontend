'use client'

import {
  Cell,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
} from 'recharts'

interface ChartDataItem {
  label: string
  value: number
  color: string
}

interface PieChartProps {
  data: ChartDataItem[]
}

export function PieChart({ data }: Readonly<PieChartProps>) {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <RechartPieChart width={800} height={400} className='relative'>
        <Pie
          data={data}
          cx='50%'
          cy='100%'
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={1}
          dataKey='value'
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.label}`} fill={entry.color} />
          ))}
        </Pie>
      </RechartPieChart>
    </ResponsiveContainer>
  )
}
