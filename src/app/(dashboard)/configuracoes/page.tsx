import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Configurações',
}

import { DashboardContainer } from '@/components/dashboard/container'

export default function Page() {
  return (
    <DashboardContainer className='flex flex-col gap-6'>
      Configurações
    </DashboardContainer>
  )
}
