import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { getRoutes } from '@/constants/routes'

interface PatientDetailsLayoutProps {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export default async function PatientDetailsLayout({
  params,
  children,
}: Readonly<PatientDetailsLayoutProps>) {
  const patientId = (await params).id
  const routes = getRoutes(patientId)

  const tabButtons = [
    {
      title: 'Informações do paciente',
      path: routes.dashboard.patients.details.info,
    },
    {
      title: 'Histórico do paciente',
      path: routes.dashboard.patients.details.history,
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
