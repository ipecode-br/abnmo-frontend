import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipes',
}

import { DashboardContainer } from '@/components/dashboard/container'

import DashboardTeamManagement from './table'

export default function TeamsPage() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      <DashboardTeamManagement />
    </DashboardContainer>
  )
}
