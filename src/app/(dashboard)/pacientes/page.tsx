import type { Metadata } from 'next'

import { PatientsListTable } from '@/modules/patients/list/table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function Page() {
  return <PatientsListTable />
}
