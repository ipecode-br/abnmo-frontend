import { getCurrentUser } from '@/actions/users/get-current-user'
import { BottomBar } from '@/components/bottom-bar'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { Sidebar } from '@/components/sidebar'
import { PermissionsProvider } from '@/providers/permissions-provider'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <PermissionsProvider initialState={{ user }}>
      <div className='flex h-svh overflow-hidden max-lg:flex-col'>
        <Sidebar />

        <div className='flex h-svh flex-1 flex-col overflow-x-hidden transition-all duration-500'>
          <DashboardHeader />
          <DashboardTabButtons />

          <main className='bg-background-soft flex flex-1 flex-col gap-4 p-4 md:p-6 lg:gap-6 lg:p-8'>
            {children}
          </main>
        </div>

        <BottomBar />
      </div>
    </PermissionsProvider>
  )
}
