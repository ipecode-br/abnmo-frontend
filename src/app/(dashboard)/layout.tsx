import { DashboardSidebar } from '@/app/(dashboard)/_sidebar'
import { DashboardContainer } from '@/app/(dashboard)/container'

import { DashboardHeader } from './_header'

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-svh'>
      <DashboardSidebar />

      <div className='flex-1'>
        <DashboardHeader />
        <DashboardContainer>{children}</DashboardContainer>
      </div>
    </div>
  )
}
