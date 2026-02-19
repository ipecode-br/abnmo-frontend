import type { Metadata } from 'next'
import { Suspense } from 'react'

import { PageLoader } from '@/components/ui/page-loader'
import { UsersList } from '@/modules/users/list'

export const metadata: Metadata = {
  title: 'Equipe',
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoader text='Carregando lista da equipe...' />}>
      <UsersList />
    </Suspense>
  )
}
