import type { Metadata } from 'next'

import { PatientsTable } from '@/modules/patients/table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function Page() {
  return <PatientsTable />
}
