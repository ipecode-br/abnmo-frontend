import { CheckCircle2Icon, CircleXIcon, Users2Icon } from 'lucide-react'

import { DashboardGenderChartCard } from '@/app/(dashboard)/_cards/gender-chart'
import { DashboardOverviewPatientsCard } from '@/app/(dashboard)/_cards/patients'
import { DashboardContainer } from '@/components/dashboard/container'
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

import { DashboardCitiesChartCard } from './_cards/cities-chart'

export default function DashboardOverview() {
  const totalPatients = PATIENTS_MOCKS.length
  const activePatients = PATIENTS_MOCKS.filter(
    (patient) => patient.status === 'active',
  ).length
  const inactivePatients = PATIENTS_MOCKS.filter(
    (patient) => patient.status === 'inactive',
  ).length

  return (
    <DashboardContainer>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
        <DashboardOverviewPatientsCard
          title={
            <>
              <strong>Total</strong> de pacientes
            </>
          }
          variant='default'
          value={totalPatients}
          icon={<Users2Icon className='text-primary' />}
        />
        <DashboardOverviewPatientsCard
          title={
            <>
              Total de pacientes <strong>ativos</strong>
            </>
          }
          value={activePatients}
          icon={<CheckCircle2Icon className='text-success' />}
          variant='active'
        />
        <DashboardOverviewPatientsCard
          title={
            <>
              Total de pacientes <strong>inativos</strong>
            </>
          }
          value={inactivePatients}
          icon={<CircleXIcon className='text-error' />}
          variant='inactive'
        />

        <DashboardGenderChartCard />
        <DashboardCitiesChartCard />
      </div>
    </DashboardContainer>
  )
}
