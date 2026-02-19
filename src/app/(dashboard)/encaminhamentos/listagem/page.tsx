import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageLoader } from '@/components/ui/page-loader'
import { ReferralsList } from '@/modules/referrals/list'

export const metadata: Metadata = {
  title: 'Encaminhamentos',
}

export default function Page() {
  return (
    <Suspense
      fallback={<PageLoader text='Carregando lista de encaminhamentos...' />}
    >
      <ReferralsList />
    </Suspense>
  )
}
