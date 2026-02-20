import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { PageLoader } from '@/components/ui/page-loader'
import { ROUTES } from '@/constants/routes'
import { UserInvitesList } from '@/modules/users/invites/list'

export const metadata: Metadata = {
  title: 'Convites',
}

export default async function Page() {
  const canAccess = await canUser('view', 'Invites')

  if (!canAccess) {
    redirect(ROUTES.dashboard.main)
  }

  return (
    <Suspense fallback={<PageLoader text='Carregando lista de convites...' />}>
      <UserInvitesList />
    </Suspense>
  )
}
