import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth'
import { PatientHeader } from '@/app/paciente/_header'
import { DashboardTabButtons } from '@/components/dashboard/tab-buttons'
import { ROUTES } from '@/constants/routes'

import { ActionHelp } from './_action-help'
export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const canAccess = await canUser('view', 'PatientDashboard')

  const tabButtons = [
    {
      title: 'Pendentes',
      path: ROUTES.patient.documents.pending,
    },
    {
      title: 'Enviados',
      path: ROUTES.patient.documents.sent,
    },
  ]

  if (!canAccess) {
    redirect(ROUTES.dashboard.main)
  }

  return (
    <main className='flex flex-col'>
      <PatientHeader />
      <DashboardTabButtons buttons={tabButtons} />
      <ActionHelp />
      {children}
    </main>
  )
}
