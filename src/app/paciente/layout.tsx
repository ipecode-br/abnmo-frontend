import { redirect } from 'next/navigation'

import { getProfile } from '@/actions/users'
import { PatientHeader } from '@/app/paciente/_header'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

export default async function PatientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getProfile()

  // TODO: implement role validation
  if (user.role !== 'patient') {
    redirect(ROUTES.dashboard.main)
  }

  return (
    <div>
      <PatientHeader />
      <Divider />
      {children}
    </div>
  )
}
