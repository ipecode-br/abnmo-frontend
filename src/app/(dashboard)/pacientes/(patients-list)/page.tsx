import type { Metadata } from 'next'

import PatientsListTable from './table'

export const metadata: Metadata = {
  title: 'Pacientes',
}

export default function PatientsListPage() {
  return <PatientsListTable />
}
