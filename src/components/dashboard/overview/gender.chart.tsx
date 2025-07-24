import { ChartBarDecreasingIcon } from 'lucide-react'

import { BarChart } from '@/components/charts/bar'

import { DashboardCardChart } from '../cards/chart'

export function DashboardGenderChartCard() {
  const rawData = {
    labels: ['Feminino', 'Masculino', 'Outros'],
    datasets: [
      {
        label: 'Gênero',
        data: [10, 7, 5],
        backgroundColor: ['#008b62'],
      },
    ],
  }

  const formattedData = rawData.labels.map((label, index) => ({
    name: label,
    value: rawData.datasets[0].data[index],
  }))

  return (
    <DashboardCardChart title='Gênero' icon={ChartBarDecreasingIcon}>
      <BarChart data={formattedData} />
    </DashboardCardChart>
  )
}
