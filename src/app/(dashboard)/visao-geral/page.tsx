import type { Metadata } from 'next'

import { GenderChart } from '@/components/chart/gender-chart'

export const metadata: Metadata = {
  title: 'Visão Geral',
}

// Dados que virão do backend (exemplo para teste)
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

export default function OverviewPage() {
  return (
    <div>
      <GenderChart rawData={rawData} />
    </div>
  )
}
