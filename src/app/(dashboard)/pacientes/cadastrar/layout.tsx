import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

interface LayoutProps {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export default async function Layout({ children }: Readonly<LayoutProps>) {
  const tabButtons = [
    {
      title: 'Cadastro de novo paciente',
      path: ROUTES.dashboard.patients.cadastrar,
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
