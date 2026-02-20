import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth/can-user'
import { getUserFromToken } from '@/actions/users/get-user-from-token'
import { BottomBar } from '@/components/bottom-bar'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { DashboardSidebar } from '@/components/sidebar'
import { ROUTES } from '@/constants/routes'
import { PermissionsProvider } from '@/lib/permissions/provider'

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, canAccess] = await Promise.all([
    getUserFromToken(),
    canUser('view', 'Dashboard'),
  ])

  if (!canAccess) {
    redirect(ROUTES.auth.clearSession)
  }

  return (
    <PermissionsProvider initialState={{ user }}>
      <div className='flex h-svh overflow-hidden max-lg:flex-col'>
        <DashboardSidebar />

        <div className='flex h-svh flex-1 flex-col overflow-x-hidden transition-all duration-500'>
          <DashboardHeader />
          <DashboardTabButtons />

          <main className='bg-background-soft flex flex-1 flex-col gap-4 p-6 lg:gap-6 lg:p-8'>
            {children}
          </main>
        </div>

        <BottomBar />
      </div>
    </PermissionsProvider>
  )
}
