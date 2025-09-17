import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth'
import { DashboardSidebar } from '@/app/(dashboard)/_sidebar'
import { ROUTES } from '@/constants/routes'

import { DashboardHeader } from './_header'

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const canAccess = await canUser('view', 'Dashboard')

  if (!canAccess) {
    redirect(ROUTES.patient.main)
  }

  return (
    <div className='flex min-h-svh'>
      <DashboardSidebar />

      <div className='flex flex-1 flex-col overflow-hidden'>
        <DashboardHeader />
        {children}
      </div>
    </div>
  )
}
