import type { Metadata } from 'next'

import { PatientsList } from '@/modules/patients/patients-list'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function Page() {
  return <PatientsList />
}
