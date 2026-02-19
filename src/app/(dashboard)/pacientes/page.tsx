import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageLoader } from '@/components/ui/page-loader'
import { PatientsList } from '@/modules/patients/patients-list'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoader text='Carregando lista de pacientes...' />}>
      <PatientsList />
    </Suspense>
  )
}
