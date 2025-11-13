import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aprovações',
}

import { DashboardContainer } from '@/components/dashboard/container'

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      Aprovações
    </DashboardContainer>
  )
}
