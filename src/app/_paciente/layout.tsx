import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth'
import { PatientHeader } from '@/app/_paciente/_header'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

import { ActionHelp } from './_action-help'

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const canAccess = await canUser('view', 'PatientDashboard')

  if (!canAccess) {
    redirect(ROUTES.dashboard.main)
  }

  return (
    <>
      <PatientHeader />
      <Divider />
      <ActionHelp />
      {children}
    </>
  )
}
