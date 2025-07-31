import { DashboardContainer } from '@/components/dashboard/container'

export default function DashboardOverview() {
  return (
    <DashboardContainer>
      <div className='grid grid-cols-2 gap-6 md:grid-cols-4'>
        <div className='bg-primary text-primary-foreground space-y-4 rounded-2xl p-8'>
          <h2 className='text-xl'>Visão Geral</h2>
          <p className='text-sm'>
            Esta é uma visão geral do sistema para monitorar e gerenciar
            atendimentos.
          </p>
        </div>
      </div>
    </DashboardContainer>
  )
}
