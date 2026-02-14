import type { Metadata } from 'next'

import { PatientAppointmentsList } from '@/modules/patients/appointments-list'

export const metadata: Metadata = {
  title: 'Atendimentos',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Readonly<PageParams>) {
  const patientId = (await params).id

  return <PatientAppointmentsList patientId={patientId} />
}
