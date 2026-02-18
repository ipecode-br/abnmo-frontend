import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
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
        <DashboardTabButtons />

        <main className='bg-background-soft flex flex-1 flex-col gap-6 p-8'>
          {children}
        </main>
      </DashboardWrapper>
    </>
  )
}
