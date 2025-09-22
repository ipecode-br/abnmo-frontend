import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membros',
}

import DashboardMembersManagement from '../_cards/members'

export default function MembersPage() {
  return <DashboardMembersManagement />
}
