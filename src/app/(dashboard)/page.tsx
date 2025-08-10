import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardCitiesChartCard } from '@/components/dashboard/overview/cities-chart'
import { DashboardGenderChartCard } from '@/components/dashboard/overview/gender-chart'
import { Card } from '@/components/ui/card'

export default function DashboardOverview() {
  return (
    <DashboardContainer>
      <div className='mb-6 grid grid-cols-1 gap-6 md:grid-cols-3'>
        <Card />
        <Card />
        <Card />
      </div>
      <div className='flex gap-6'>
        <div className='w-1/2'>
          <DashboardGenderChartCard />
        </div>
        <div className='w-1/2'>
          <DashboardCitiesChartCard />
        </div>
      </div>
    </DashboardContainer>
  )
}
