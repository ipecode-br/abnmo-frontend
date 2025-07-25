import { DashboardContainer } from '@/components/dashboard/container'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

interface PatientDetailsLayoutProps {
  params: Promise<{ id: string }>
  children: React.ReactNode
}

export default async function PatientDetailsLayout({
  params,
  children,
}: Readonly<PatientDetailsLayoutProps>) {
  const patientId = (await params).id

  const tabButtons = [
    {
      title: 'Informações do paciente',
      path: ROUTES.dashboard.patients.details.info(patientId),
    },
    {
      title: 'Histórico do paciente',
      path: ROUTES.dashboard.patients.details.history(patientId),
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
