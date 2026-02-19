import { BottomBar } from '@/components/bottom-bar'
import { DashboardHeader } from '@/components/dashboard/header'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { DashboardSidebar } from '@/components/sidebar'

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
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
  )
}
