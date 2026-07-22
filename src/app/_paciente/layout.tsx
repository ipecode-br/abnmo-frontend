import { PatientHeader } from '@/app/_paciente/_header'
import { Divider } from '@/components/ui/divider'

import { ActionHelp } from './_action-help'

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PatientHeader />
      <Divider />
      <ActionHelp />
      {children}
    </>
  )
}
