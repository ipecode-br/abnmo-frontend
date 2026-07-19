import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { PageLoader } from '@/components/ui/page-loader'
import { ROUTES } from '@/constants/routes'
import { PatientsList } from '@/modules/patients/patients-list'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default async function Page() {
  const canAccess = await canUser('read:patient:others')

  if (!canAccess) {
    redirect(ROUTES.main)
  }

  return (
    <Suspense fallback={<PageLoader text='Carregando lista de pacientes...' />}>
      <PatientsList />
    </Suspense>
  )
}
