import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Atendimentos',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Readonly<PageParams>) {
  const patientId = (await params).id

  if (!patientId) {
    redirect(ROUTES.dashboard.patients.main)
  }

  return <div>Atendimentos do paciente</div>
}
