import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardGenderChartCard } from '@/components/dashboard/overview/gender-chart'

export default function DashboardOverview() {
  return (
    <DashboardContainer>
      <div className='grid gap-6 md:grid-cols-6'>
        <div className='bg-primary text-primary-foreground space-y-4 rounded-2xl p-8'>
          <h2 className='text-xl'>Visão Geral</h2>
          <p className='text-sm'>
            Esta é uma visão geral do sistema para monitorar e gerenciar
            atendimentos.
          </p>
        </div>

        <DashboardGenderChartCard />
      </div>
    </DashboardContainer>
  )
}
