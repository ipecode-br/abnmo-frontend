import { ForwardIcon, UserRoundIcon } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPatient } from '@/actions/patients/get-patient'
import { PatientsForm } from '@/components/patients/form'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { InactivatePatientButton } from '@/modules/patients/inactivate-button'

export const metadata: Metadata = {
  title: 'Informações do paciente',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function Page({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patientId = (await params).id

  if (!patientId) {
    redirect(ROUTES.dashboard.patients.main)
  }

  const patient = await getPatient(patientId)

  if (!patient) {
    return <p>Paciente não encontrado</p>
  }

  const isPatientActive = patient.status === 'active'

  return (
    <>
      <header className='mb-3 flex justify-between'>
        <div className='flex items-center gap-4'>
          <span className='bg-border/50 rounded-lg p-2'>
            <UserRoundIcon className='text-primary size-5.5' />
          </span>
          <h1 className='text-xl font-medium'>Informações do paciente</h1>
        </div>

        <div className='flex gap-2'>
          {isPatientActive && <InactivatePatientButton patient={patient} />}
          <Button>
            <ForwardIcon />
            Encaminhar paciente
          </Button>
        </div>
      </header>

      <PatientsForm patient={patient} mode='view' />
    </>
  )
}
