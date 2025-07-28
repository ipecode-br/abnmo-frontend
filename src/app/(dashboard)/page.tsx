import type { Metadata } from 'next'

import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardGenderChartCard } from '@/components/dashboard/overview/gender-chart'

export const metadata: Metadata = {
  title: 'Visão Geral',
}

export default function DashboardOverviewPage() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      <DashboardGenderChartCard />
    </DashboardContainer>
  )
}
