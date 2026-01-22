import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardWrapper } from '@/components/dashboard/wrapper'
import { DashboardSidebar } from '@/components/sidebar'
import { ROUTES } from '@/constants/routes'

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const canAccess = await canUser('view', 'Dashboard')

  if (!canAccess) {
    redirect(ROUTES.patient.main)
  }

  return (
    <>
      <DashboardSidebar />

      <DashboardWrapper>
        <DashboardHeader />
        {children}
      </DashboardWrapper>
    </>
  )
}
