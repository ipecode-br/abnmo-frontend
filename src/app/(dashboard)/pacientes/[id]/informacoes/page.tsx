import { User2Icon } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPatient } from '@/actions/patients/get-patient'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { ROUTES } from '@/constants/routes'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'
import { PatientForm } from '@/modules/patients/form'
import { InactivatePatientButton } from '@/modules/patients/inactivate-button'
import { NewReferralButton } from '@/modules/referrals/new-referral-button'

export const metadata: Metadata = {
  title: 'Informações do paciente',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Readonly<PageParams>) {
  const patientId = (await params).id

  const patient = await getPatient(patientId)

  if (!patient) {
    redirect(ROUTES.dashboard.patients.main)
  }

  const isPatientActive = patient.status === 'active'

  return (
    <>
      <SectionHeader className='mb-3'>
        <SectionHeaderTitle
          title='Informações do paciente'
          icon={<User2Icon />}
        />

        {isPatientActive && (
          <SectionHeaderActions>
            <InactivatePatientButton patient={patient} size='sm' />
            <NewReferralButton patientId={patient.id} size='sm' />
            <NewAppointmentButton patientId={patient.id} size='sm' />
          </SectionHeaderActions>
        )}
      </SectionHeader>

      <PatientForm patient={patient} mode='view' />
    </>
  )
}
