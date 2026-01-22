import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PatientsListTable } from '@/modules/patients/list/table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PatientsListTable />
    </Suspense>
  )
}
