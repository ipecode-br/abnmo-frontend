import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Informações da catalogação',
}

interface PageParams {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageParams) {
  const canAccess = await canUser('view', 'Surveys')

  const id = (await params).id

  if (!canAccess) {
    redirect(ROUTES.dashboard.main)
  }

  return <div>{id}</div>
}
