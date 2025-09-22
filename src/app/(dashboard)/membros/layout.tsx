import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

interface MembersDetailsLayoutProps {
  children: React.ReactNode
}

export default async function MembersDetailsLayout({
  children,
}: Readonly<MembersDetailsLayoutProps>) {
  const tabButtons = [
    {
      title: 'Todos os associados',
      path: ROUTES.dashboard.members.main,
    },
    {
      title: 'Gerenciar cargos',
      path: ROUTES.dashboard.members.details.positions,
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
