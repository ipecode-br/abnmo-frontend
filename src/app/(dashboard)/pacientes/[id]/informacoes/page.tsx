import { Forward, UserRoundIcon, UserRoundMinus } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPatient } from '@/actions/patients/get-patient'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

import { PatientsInfoForm } from './info-form'

export const metadata: Metadata = {
  title: 'Informações',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function PatientInfoPage({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patientId = (await params).id

  if (!patientId) {
    redirect(ROUTES.dashboard.patients.main)
  }

  const patient = await getPatient(patientId)

  if (!patient) {
    redirect(ROUTES.dashboard.patients.main)
  }

  return (
    <>
      <header className='mb-3 flex justify-between'>
        <div className='flex items-center gap-x-4'>
          <span className='bg-accent rounded-lg p-2'>
            <UserRoundIcon />
          </span>
          <h1 className='text-xl font-medium'>Informações do paciente</h1>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline'>
            <UserRoundMinus />
            Inativar paciente
          </Button>
          <Button>
            <Forward />
            Encaminhar paciente
          </Button>
        </div>
      </header>

      <PatientsInfoForm patient={patient} mode='view' />
    </>
  )
}
