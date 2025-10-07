import { Slot } from '@radix-ui/react-slot'
import { UserRoundPlus } from 'lucide-react'
import type { Metadata } from 'next'

import { PatientsForm } from '@/components/patients/form'

export const metadata: Metadata = {
  title: 'Cadastrar novo pacientes',
}

export default function Page() {
  return (
    <>
      <div className='flex items-center gap-4'>
        <span className='bg-border/50 rounded-lg p-2'>
          <Slot className='text-primary size-5.5'>
            <UserRoundPlus />
          </Slot>
        </span>

        <h1 className='text-xl font-medium'>Cadastro de novo paciente</h1>
      </div>
      <PatientsForm mode='create' />
    </>
  )
}
