import type { Metadata } from 'next'

import { ApprovalsListTable } from './approvals-list-table'

export const metadata: Metadata = {
  title: 'Aprovados',
}

export default function Page() {
  return <ApprovalsListTable />
}
