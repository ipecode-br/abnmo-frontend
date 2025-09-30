import { redirect } from 'next/navigation'

import { canUser } from '@/actions/auth'
import { PatientHeader } from '@/app/paciente/_header'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

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
      {children}
    </>
  )
}
