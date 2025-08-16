'use client'

import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardOverviewPatientsCard } from '@/components/dashboard/overview/patients-card'

import { PATIENTS_MOCKS } from '../../utils/mock/patients'

function DashboardOverview() {
  return (
    <div className='text-primary-foreground max-h-35 min-h-25 w-full space-y-2 rounded-2xl bg-[#31c48e] p-6'>
      <h2 className='text-xl leading-tight font-semibold'>Visão Geral</h2>
      <p className='text-sm leading-snug'>
        Esta é uma visão geral do sistema para monitorar e gerenciar
        atendimentos.
      </p>
    </div>
  )
}

export default function VisionPage() {
  const totalPatients = PATIENTS_MOCKS.length
  const activePatients = PATIENTS_MOCKS.filter(
    (patient) => patient.status === 'active',
  ).length
  const inactivePatients = PATIENTS_MOCKS.filter(
    (patient) => patient.status === 'inactive',
  ).length

  return (
    <DashboardContainer className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
      <DashboardOverview />

      <DashboardOverviewPatientsCard
        title='Total de Pacientes'
        value={totalPatients}
        variant='default'
      />
      <DashboardOverviewPatientsCard
        title='Total de Pacientes Ativos'
        value={activePatients}
        variant='active'
      />
      <DashboardOverviewPatientsCard
        title='Total de Pacientes Inativos'
        value={inactivePatients}
        variant='inactive'
      />
    </DashboardContainer>
  )
}
