import { UserRoundPlusIcon } from 'lucide-react'
import type { Metadata } from 'next'

import { DashboardContainer } from '@/components/dashboard/container'
import { PatientsForm } from '@/components/patients/form'

export const metadata: Metadata = {
  title: 'Cadastrar novo paciente',
}

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      <div className='flex items-center gap-4'>
        <span className='bg-border/50 rounded-lg p-2'>
          <UserRoundPlusIcon className='text-primary size-5.5' />
        </span>

        <h1 className='text-xl font-medium'>Cadastrar novo paciente</h1>
      </div>

      <PatientsForm mode='create' />
    </DashboardContainer>
  )
}
