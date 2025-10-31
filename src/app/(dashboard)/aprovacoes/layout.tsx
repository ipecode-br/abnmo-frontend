import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tabButtons = [
    {
      title: 'Aprovações pendentes',
      path: ROUTES.dashboard.approvals.main,
    },
    {
      title: 'Envios pendentes',
      path: ROUTES.dashboard.approvals.pending,
    },
    {
      title: 'Aprovados',
      path: ROUTES.dashboard.approvals.approved,
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
