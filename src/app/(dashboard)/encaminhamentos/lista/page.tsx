import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { PageLoader } from '@/components/ui/page-loader'
import { ROUTES } from '@/constants/routes'
import { ReferralsList } from '@/modules/referrals/list'

export const metadata: Metadata = {
  title: 'Lista de encaminhamentos',
}

export default async function Page() {
  const canAccess = await canUser(['read:referral', 'read:referral:others'])

  if (!canAccess) {
    redirect(ROUTES.main)
  }

  return (
    <Suspense
      fallback={<PageLoader text='Carregando lista de encaminhamentos...' />}
    >
      <ReferralsList />
    </Suspense>
  )
}
