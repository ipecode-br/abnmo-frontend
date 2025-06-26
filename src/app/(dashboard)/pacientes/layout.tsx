import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

import { DashboardContainer } from '../container'

export default function PatientsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tabButtons = [
    {
      title: 'Lista de pacientes',
      path: ROUTES.dashboard.patients.main,
    },
  ]

  return (
    <div className='flex flex-1 flex-col'>
      <DashboardTabButtons buttons={tabButtons} />
      <DashboardContainer className='flex flex-col gap-6'>
        {children}
      </DashboardContainer>
    </div>
  )
}
