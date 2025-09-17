import { CheckCircle2Icon, CircleXIcon, Users2Icon } from 'lucide-react'

import { DashboardOverviewPatientsByGender } from '@/app/(dashboard)/_cards/patients-by-gender'
import { DashboardOverviewPatientsByStatus } from '@/app/(dashboard)/_cards/patients-by-status'
import { DashboardContainer } from '@/components/dashboard/container'
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

import DashboardOverviewAppointments from './_cards/appointments'
import { DashboardOverviewPatientsByCity } from './_cards/patients-by-city'

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
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-6'>
        <DashboardOverviewPatientsByStatus
          title={
            <>
              <strong>Total</strong> de pacientes
            </>
          }
          value={totalPatients}
          icon={<Users2Icon className='text-primary' />}
        />
        <DashboardOverviewPatientsByStatus
          title={
            <>
              Total de pacientes <strong>ativos</strong>
            </>
          }
          value={activePatients}
          icon={<CheckCircle2Icon className='text-success' />}
        />
        <DashboardOverviewPatientsByStatus
          title={
            <>
              Total de pacientes <strong>inativos</strong>
            </>
          }
          value={inactivePatients}
          icon={<CircleXIcon className='text-error' />}
        />

        <DashboardOverviewPatientsByGender />
        <DashboardOverviewPatientsByCity />

        <DashboardOverviewAppointments />
      </div>
    </DashboardContainer>
  )
}
