import { Divider } from '@/components/ui/divider'
import { ScreeningHeader } from '@/components/ui/dropdown/screening-header'

export default function ScreeningLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <ScreeningHeader />
      <Divider />
      {children}
    </div>
  )
}
