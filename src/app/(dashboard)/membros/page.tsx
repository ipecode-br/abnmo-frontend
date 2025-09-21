import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membros',
}

import { DashboardContainer } from '@/components/dashboard/container'

import DashboardMembersManagement from '../_cards/members'

export default function MembersPage() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      <DashboardMembersManagement />
    </DashboardContainer>
  )
}
