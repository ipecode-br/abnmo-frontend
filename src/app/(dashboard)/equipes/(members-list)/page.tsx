import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipes',
}

import { MembersListTable } from './table'

export default function Page() {
  return <MembersListTable />
}
