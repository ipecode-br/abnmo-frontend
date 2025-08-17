import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardCitiesChartCard } from '@/components/dashboard/overview/cities-chart'
import { DashboardGenderChartCard } from '@/components/dashboard/overview/gender-chart'

export default function DashboardOverview() {
  return (
    <DashboardContainer>
      <div className='grid gap-6 md:grid-cols-6'>
        <DashboardGenderChartCard className='md:col-span-3' />
        <DashboardCitiesChartCard className='md:col-span-3' />
      </div>
    </DashboardContainer>
  )
}
