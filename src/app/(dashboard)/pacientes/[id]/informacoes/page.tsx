import { Forward, UserRoundIcon, UserRoundMinus } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

import { PatientsInfoForm } from './patients-info-form'

export const metadata: Metadata = {
  title: 'Informações',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function PatientInfoPage({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patient = {
    ...PATIENTS_MOCKS[4],
    need_legal_assistance: true,
    supports: [
      {
        id: '12323',
        name: 'John Doe',
        phone: '(11) 91234-5678',
        kinship: 'Mãe',
      },
      {
        id: '123232',
        name: 'John Doe',
        phone: '(11) 91234-5678',
        kinship: 'Mãe',
      },
    ],
  }

  const patientId = (await params).id

  if (!patientId) {
    redirect(ROUTES.dashboard.patients.main)
  }

  return (
    <div className='flex flex-col gap-y-6'>
      <section className='flex justify-between'>
        <div className='flex items-center gap-x-4'>
          <span className='bg-accent rounded-lg p-2'>
            <UserRoundIcon />
          </span>
          <h1 className='text-xl font-medium'>Informações do paciente</h1>
        </div>
        <div className='flex gap-x-2'>
          <Button variant='outline' className='text-primary'>
            <UserRoundMinus />
            Inativar paciente
          </Button>
          <Button>
            <Forward />
            Encaminhar paciente
          </Button>
        </div>
      </section>
      <PatientsInfoForm patient={patient} mode='view' />
    </div>
  )
}
