import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'

import { DashboardContainer } from '../container'

export default function PatientsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex flex-1 flex-col'>
      <DashboardTabButtons />
      <DashboardContainer className='flex flex-col gap-6'>
        {children}
      </DashboardContainer>
    </div>
  )
}
