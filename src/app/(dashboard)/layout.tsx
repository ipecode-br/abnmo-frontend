import { redirect } from 'next/navigation'

import { getProfile } from '@/actions/users'
import { DashboardSidebar } from '@/app/(dashboard)/_sidebar'
import { ROUTES } from '@/constants/routes'

import { DashboardHeader } from './_header'

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getProfile()

  // TODO: implement role validation
  if (user.role === 'patient') {
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
