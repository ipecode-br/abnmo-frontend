import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

interface NotificationCardProps {
  label: string
}

export function NotificationCard({ label }: NotificationCardProps) {
  return (
    <Card className='flex w-full max-w-4xl items-center p-3'>
      <p className='text-foreground-soft mr-auto font-normal'>{label}</p>
      <Switch />
    </Card>
  )
}
