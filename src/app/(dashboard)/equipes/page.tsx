import type { Metadata } from 'next'

import { TeamListTable } from '@/modules/teams/table'

export const metadata: Metadata = {
  title: 'Equipe',
}

export default function Page() {
  return <TeamListTable />
}
