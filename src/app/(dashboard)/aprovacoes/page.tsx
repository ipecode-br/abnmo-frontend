import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

export const metadata: Metadata = {
  title: 'Aprovações',
}

export default function Page() {
  redirect(ROUTES.dashboard.approvals.pendingApprovals)
}
