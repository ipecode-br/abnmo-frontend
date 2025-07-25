import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Informações',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function PatientInfoPage({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patientId = (await params).id

  if (!patientId) {
    redirect(ROUTES.dashboard.patients.main)
  }

  return <div>ID do paciente: {patientId}</div>
}
