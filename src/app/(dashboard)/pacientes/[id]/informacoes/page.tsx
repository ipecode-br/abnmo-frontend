import { Forward, UserRoundIcon, UserRoundMinus } from 'lucide-react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { GenderType, PatientStatusType } from '@/types/patients'

import { PatientsInfoForm } from './patients-info-form'

export const metadata: Metadata = {
  title: 'Informações',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

//mock only for testing on the form
const mockPatientData = {
  id: '123456ff',
  user_id: '123456ff',
  gender: 'male' as GenderType,
  date_of_birth: new Date('1990-05-20'),
  phone: '+55 71 91234-5678',
  status: 'active' as PatientStatusType,
  cpf: '123.456.789-00',
  state: 'BA',
  city: 'Salvador',
  has_disability: true,
  disability_desc: 'Dificuldade de locomoção',
  need_legal_assistance: true,
  take_medication: true,
  medication_desc: 'Antidepressivo',
  has_nmo_diagnosis: false,
  created_at: new Date('2025-01-01'),
  updated_at: new Date('2025-08-19'),
  user: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar_url: '',
  },
}

export default async function PatientInfoPage({
  params,
}: Readonly<PatientHistoryPageParams>) {
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
      <PatientsInfoForm patient={mockPatientData} mode='edit' />
    </div>
  )
}
