import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { PageLoader } from '@/components/ui/page-loader'
import { ROUTES } from '@/constants/routes'
import { PendingSurveysList } from '@/modules/surveys/submissions/pending-list'

export const metadata: Metadata = {
  title: 'Catalogação',
}

export default async function Page() {
  const canAccess = await canUser('view', 'Surveys')

  if (!canAccess) {
    redirect(ROUTES.dashboard.main)
  }

  return (
    <Suspense fallback={<PageLoader text='Carregando catalogações...' />}>
      <PendingSurveysList />
    </Suspense>
  )
}
