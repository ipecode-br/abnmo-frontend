import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tabButtons = [
    {
      title: 'Dados Gerais',
      path: ROUTES.dashboard.forwarded.main,
    },
    {
      title: 'Encaminhamentos',
      path: ROUTES.dashboard.forwarded.referrals,
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
