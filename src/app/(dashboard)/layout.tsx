import { DashboardSidebar } from '@/app/(dashboard)/_sidebar'

import { DashboardHeader } from './_header'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
