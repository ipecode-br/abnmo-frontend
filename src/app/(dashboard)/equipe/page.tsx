import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { PageLoader } from '@/components/ui/page-loader'
import { ROUTES } from '@/constants/routes'
import { UsersList } from '@/modules/users/list'

export const metadata: Metadata = {
  title: 'Equipe',
}

export default async function Page() {
  const canAccess = await canUser('view', 'Users')

  if (!canAccess) {
    redirect(ROUTES.dashboard.main)
  }

  return (
    <Suspense fallback={<PageLoader text='Carregando lista da equipe...' />}>
      <UsersList />
    </Suspense>
  )
}
