import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageLoader } from '@/components/ui/page-loader'
import { UserInvitesList } from '@/modules/users/invites/list'

export const metadata: Metadata = {
  title: 'Convites',
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoader text='Carregando lista de convites...' />}>
      <UserInvitesList />
    </Suspense>
  )
}
