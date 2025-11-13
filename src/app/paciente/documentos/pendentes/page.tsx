import { Metadata } from 'next'
import React from 'react'

import { getProfile } from '@/actions/users'
import { PatientRequirementCard } from '@/modules/patients/cards/patient-requirement-card'
import type { PatientRequirementType } from '@/types/patients'

export const metadata: Metadata = {
  title: 'Pendentes',
}

export default async function Page() {
  const patient = await getProfile()

  const patientName = patient ? `, ${patient.name}` : ''

  // TODO: remove this mock data when integrating with API
  const requirement: PatientRequirementType = {
    id: '1',
    type: 'form',
    title: 'Formulário de Anamnese',
    created_at: '2024-10-20',
    status: 'pending',
    submitted_at: null,
    approved_at: null,
  }

  return (
    <>
      <h1 className='mt-4 text-2xl font-medium'>
        Bem-vindo(a) ao Portal do Paciente{patientName}!
      </h1>
      <p className='text-foreground-soft mt-2'>
        Aqui você acompanha seus formulários pendentes, enviados e suas
        informações principais na ABNMO.
      </p>

      <div className='bg-background-soft mt-12 grid gap-4 rounded-3xl p-8 sm:grid-cols-2 lg:grid-cols-3'>
        <h2 className='text-xl font-medium sm:col-span-2 lg:col-span-3'>
          Você possui solicitações pendentes
        </h2>
        <PatientRequirementCard requirement={requirement} />
        <PatientRequirementCard requirement={requirement} />
        <PatientRequirementCard requirement={requirement} />
      </div>
    </>
  )
}
