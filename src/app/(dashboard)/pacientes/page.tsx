import type { Metadata } from 'next'
import { Suspense } from 'react'

import { DashboardContainer } from '@/components/dashboard/container'
import { PatientsListTable } from '@/modules/patients/list/table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      <Suspense fallback={<div>Carregando...</div>}>
        <PatientsListTable />
      </Suspense>
    </DashboardContainer>
  )
}
