import type { Metadata } from 'next'

import { DashboardContainer } from '@/components/dashboard/container'
import { TeamListTable } from '@/modules/teams/table'

export const metadata: Metadata = {
  title: 'Equipe',
}

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      <TeamListTable />
    </DashboardContainer>
  )
}
