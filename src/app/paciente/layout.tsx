import { PatientHeader } from '@/app/paciente/_header'
import { Divider } from '@/components/ui/divider'

export default function ScreeningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <PatientHeader />
      <Divider />
      {children}
    </div>
  )
}
