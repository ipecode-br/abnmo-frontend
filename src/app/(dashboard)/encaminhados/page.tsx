import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Encaminhados',
}

import { DashboardContainer } from '@/components/dashboard/container'

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      Encaminhados
    </DashboardContainer>
  )
}
