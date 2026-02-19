import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageLoader } from '@/components/ui/page-loader'
import { AppointmentsList } from '@/modules/appointments/list'

export const metadata: Metadata = {
  title: 'Atendimentos',
}

export default function Page() {
  return (
    <Suspense
      fallback={<PageLoader text='Carregando lista de atendimentos...' />}
    >
      <AppointmentsList />
    </Suspense>
  )
}
