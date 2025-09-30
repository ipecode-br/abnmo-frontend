import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Suporte',
}

import { DashboardContainer } from '@/components/dashboard/container'

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      Suporte
    </DashboardContainer>
  )
}
