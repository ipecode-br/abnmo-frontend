import { User2Icon } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPatient } from '@/actions/patients/get-patient'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/constants/routes'
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'
import { DeletePatientSupportButton } from '@/modules/patient-supports/delete-patient-support-button'
import { NewPatientSupportButton } from '@/modules/patient-supports/new-patient-support-button'
import { UpdatePatientSupportButton } from '@/modules/patient-supports/update-patient-support-button'
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

  const patient = await getPatient(patientId)

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
            <DeactivatePatientButton patient={patient} size='sm' />
            <NewReferralButton patientId={patient.id} size='sm' />
            <NewAppointmentButton patientId={patient.id} size='sm' />
          </SectionHeaderActions>
        )}
      </SectionHeader>

      <PatientForm patient={patient} mode='view' />

      <section className='space-y-6'>
        <h2 className='text-xl font-medium'>Rede de apoio</h2>
        {patientSupports.length > 0 ? (
          <div className='flex flex-wrap gap-4'>
            {patientSupports.map((support) => (
              <Card key={support.id} className='p-6'>
                <h3 className='pr-6 text-lg font-medium'>{support.name}</h3>
                <div className='divide-border mt-1 space-x-3 divide-x'>
                  <span className='text-foreground-soft pr-3'>
                    {support.kinship}
                  </span>
                  <span className='mt-2 pr-6'>
                    {formatPhoneNumber(support.phone)}
                  </span>
                </div>
                <div className='mt-4 flex justify-end gap-2'>
                  <UpdatePatientSupportButton patientSupport={support} />
                  <DeletePatientSupportButton patientSupport={support} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className='text-foreground-soft'>
            Nenhum contato de apoio cadastrado para este paciente.
          </p>
        )}

        {isPatientActive && <NewPatientSupportButton patientId={patientId} />}
      </section>
    </>
  )
}
