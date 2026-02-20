import { User2Icon } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { getPatient } from '@/actions/patients/get-patient'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'
import { NewPatientSupportButton } from '@/modules/patient-supports/new-patient-support-button'
import { PatientSupportCardActions } from '@/modules/patient-supports/patient-support-card-actions'
import { DeactivatePatientButton } from '@/modules/patients/deactivate-button'
import { PatientForm } from '@/modules/patients/form'
import { NewReferralButton } from '@/modules/referrals/new-referral-button'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

export const metadata: Metadata = {
  title: 'Informações do paciente',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Readonly<PageParams>) {
  const patientId = (await params).id

  const [
    patient,
    canDeactivatePatient,
    canCreateReferral,
    canCreateAppointment,
    canCreatePatientSupport,
  ] = await Promise.all([
    getPatient(patientId),
    canUser('delete', 'Patients'),
    canUser('create', 'Referrals'),
    canUser('create', 'Appointments'),
    canUser('create', 'PatientSupports'),
  ])

  if (!patient) {
    redirect(ROUTES.dashboard.patients.main)
  }

  const patientSupports = patient.supports ?? []
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
            {canDeactivatePatient && (
              <DeactivatePatientButton patient={patient} size='sm' />
            )}
            {canCreateReferral && (
              <NewReferralButton patientId={patient.id} size='sm' />
            )}
            {canCreateAppointment && (
              <NewAppointmentButton patientId={patient.id} size='sm' />
            )}
          </SectionHeaderActions>
        )}
      </SectionHeader>

      <PatientForm patient={patient} mode='view' />

      <section className='space-y-6 max-lg:mt-6'>
        <h2 className='text-xl font-medium'>Rede de apoio</h2>
        {patientSupports.length > 0 ? (
          <div className='flex flex-wrap gap-4 max-sm:flex-col'>
            {patientSupports.map((support) => (
              <Card key={support.id} className='relative p-6 pr-16'>
                <h3 className='text-lg font-medium'>{support.name}</h3>
                <div className='mt-1 flex gap-3'>
                  <span className='text-foreground-soft'>
                    {support.kinship}
                  </span>
                  <Divider flexItem orientation='vertical' />
                  <span>{formatPhoneNumber(support.phone)}</span>
                </div>
                {isPatientActive && (
                  <PatientSupportCardActions patientSupport={support} />
                )}
              </Card>
            ))}
          </div>
        ) : (
          <p className='text-foreground-soft'>
            Nenhum contato de apoio cadastrado para este paciente.
          </p>
        )}

        {isPatientActive && canCreatePatientSupport && (
          <NewPatientSupportButton patientId={patientId} />
        )}
      </section>
    </>
  )
}
