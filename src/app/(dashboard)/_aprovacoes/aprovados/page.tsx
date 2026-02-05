import type { Metadata } from 'next'

import { ApprovedPatientRequirementsListTable } from '@/modules/patient-requirements/approved-list-table'

export const metadata: Metadata = {
  title: 'Aprovados',
}

export default function Page() {
  return <ApprovedPatientRequirementsListTable />
}
