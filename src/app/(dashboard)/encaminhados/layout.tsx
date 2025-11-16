import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tabButtons = [
    {
      title: 'Dados gerais',
      path: ROUTES.dashboard.referrals.main,
    },
    {
      title: 'Encaminhamentos',
      path: ROUTES.dashboard.referrals.list,
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
