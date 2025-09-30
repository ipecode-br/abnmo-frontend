import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

interface PatientDetailsLayoutProps {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export default function Layout({
  children,
}: Readonly<PatientDetailsLayoutProps>) {
  const tabButtons = [
    {
      title: 'Todos',
      path: ROUTES.dashboard.teams.main,
    },
    {
      title: 'Especialistas',
      path: ROUTES.dashboard.teams.specialists,
    },
  ]

  return (
    <>
      <DashboardTabButtons buttons={tabButtons} />
      <DashboardContainer className='flex flex-col gap-6'>
        {children}
      </DashboardContainer>
    </>
  )
}
