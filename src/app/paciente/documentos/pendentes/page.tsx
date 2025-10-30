import { Metadata } from 'next'
import React from 'react'

import { PatientRequirementCard } from '@/components/PatientRequirementCard/PatientRequirementCard'

export const metadata: Metadata = {
  title: 'Pendentes',
}

export default function Page() {
  return (
    <div className='bg-background min-h-screen p-8'>
      <div className='mb-8'>
        <h1 className='text-foreground text-2xl font-bold'>
          Documentos Pendentes
        </h1>
        <p className='text-foreground-soft mt-2'>
          Aqui você acompanha seus formulários pendentes e pode preenchê-los
          diretamente no portal.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <PatientRequirementCard
          title='Formulário de Triagem'
          createdAt='23/10/2024'
          status='Pendente'
          imageUrl='/images/formulario-triagem.jpg'
        />
        <PatientRequirementCard
          title='Autorização de Tratamento'
          createdAt='18/10/2024'
          status='Em análise'
          imageUrl='/images/autorizacao-tratamento.jpg'
        />
        <PatientRequirementCard
          title='Consentimento Médico'
          createdAt='15/10/2024'
          status='Aprovado'
          imageUrl='/images/consentimento-medico.jpg'
        />
      </div>
    </div>
  )
}
