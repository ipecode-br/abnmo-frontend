import { ScreeningHeader } from '@/app/triagem/screening-header'
import { Divider } from '@/components/ui/divider'

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
