'use client'

import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardOverviewCard } from '@/components/dashboard/overview/card'
import DashboardOverview from '@/components/dashboard/overview/dashboard-overview'

import { PATIENTS_MOCKS } from '../../../utils/mock/patients'

export default function SupportPage() {
  const totalPatients = PATIENTS_MOCKS.length
  const activePatients = PATIENTS_MOCKS.filter(
    (patient) => patient.status === 'active',
  ).length
  const inactivePatients = PATIENTS_MOCKS.filter(
    (patient) => patient.status === 'inactive',
  ).length

  return (
    <DashboardContainer className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
      <DashboardOverview className='max-h-35 min-h-25' />

      <DashboardOverviewCard
        title='Total de Pacientes'
        value={totalPatients}
        variant='default'
      />
      <DashboardOverviewCard
        title='Total de Pacientes Ativos'
        value={activePatients}
        variant='active'
      />
      <DashboardOverviewCard
        title='Total de Pacientes Inativos'
        value={inactivePatients}
        variant='inactive'
      />
    </DashboardContainer>
  )
}
