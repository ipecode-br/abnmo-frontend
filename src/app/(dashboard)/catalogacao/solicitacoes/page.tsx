import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { canUser } from '@/actions/auth/can-user'
import { PageLoader } from '@/components/ui/page-loader'
import { ROUTES } from '@/constants/routes'
import { SurveySubmissionsList } from '@/modules/surveys/submissions/list'

export const metadata: Metadata = {
  title: 'Solicitações',
}

export default async function Page() {
  const canAccess = await canUser('read:survey:others')

  if (!canAccess) {
    redirect(ROUTES.main)
  }

  return (
    <Suspense fallback={<PageLoader text='Carregando solicitações...' />}>
      <SurveySubmissionsList />
    </Suspense>
  )
}
