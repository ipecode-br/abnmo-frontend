import { CheckCircleIcon, Users, XCircleIcon } from 'lucide-react'

import { DashboardContainer } from '@/components/dashboard/container'
import DashboardOverviewPatientsCard from '@/components/dashboard/overview/patients-card'

export default function SupportPage() {
  const totalPatients = 100
  const activePatients = 60
  const inactivePatients = 40

  return (
    <DashboardContainer className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      <div className='max-h-35 min-h-25 w-full space-y-2 rounded-2xl bg-[var(--color-primary)] p-6 text-[var(--color-primary-foreground)]'>
        <h2 className='text-xl leading-tight font-semibold'>Visão Geral</h2>
        <p className='text-sm leading-snug'>
          Esta é uma visão geral do sistema para monitorar e gerenciar
          atendimentos.
        </p>
      </div>

      <DashboardOverviewPatientsCard
        title={
          <span>
            Total de <strong>PACIENTES</strong>
          </span>
        }
        value={totalPatients}
        icon={<Users className='text-[var(--color-primary)]' />}
      />
      <DashboardOverviewPatientsCard
        title={
          <span>
            Total de <strong>PACIENTES ATIVOS</strong>
          </span>
        }
        value={activePatients}
        icon={<CheckCircleIcon className='text-[var(--color-success)]' />}
      />
      <DashboardOverviewPatientsCard
        title={
          <span>
            Total de <strong>PACIENTES INATIVOS</strong>
          </span>
        }
        value={inactivePatients}
        icon={<XCircleIcon className='text-[var(--color-error)]' />}
      />
    </DashboardContainer>
  )
}
