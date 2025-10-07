import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

import PatientHistoryTable from './patient-history-table'

export const metadata: Metadata = {
  title: 'Histórico',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function Page({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patientId = (await params).id

  if (!patientId) {
    redirect(ROUTES.dashboard.patients.main)
  }

  return <PatientHistoryTable />
}
