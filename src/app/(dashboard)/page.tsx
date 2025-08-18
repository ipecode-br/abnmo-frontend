import { DashboardContainer } from '@/components/dashboard/container'
import PatientsCard from '@/components/dashboard/overview/patients-card'

export default function SupportPage() {
  const totalPatients = 100
  const activePatients = 60
  const inactivePatients = 40

  return (
    <DashboardContainer className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <div className='text-primary-foreground max-h-35 min-h-25 w-full space-y-2 rounded-2xl bg-[#31c48e] p-6'>
        <h2 className='text-xl leading-tight font-semibold'>Visão Geral</h2>
        <p className='text-sm leading-snug'>
          Esta é uma visão geral do sistema para monitorar e gerenciar
          atendimentos.
        </p>
      </div>

      <PatientsCard
        title='Total de Pacientes'
        value={totalPatients}
        variant='default'
      />
      <PatientsCard
        title='Total de Pacientes Ativos'
        value={activePatients}
        variant='active'
      />
      <PatientsCard
        title='Total de Pacientes Inativos'
        value={inactivePatients}
        variant='inactive'
      />
    </DashboardContainer>
  )
}
