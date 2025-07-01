import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getRoutes } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Histórico',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function PatientHistoryPage({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patientId = (await params).id
  const routes = getRoutes(patientId)

  if (!patientId) {
    redirect(routes.dashboard.patients.main)
  }

  return <div>ID do paciente: {patientId}</div>
}
