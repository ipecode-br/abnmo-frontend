import { Card } from '@/components/ui/card'

interface DashboardOverviewPatientsByStatusProps {
  title: string | React.ReactNode
  value: number
  icon: React.ReactNode
}

export function DashboardOverviewPatientsByStatus({
  title,
  value,
  icon,
}: Readonly<DashboardOverviewPatientsByStatusProps>) {
  return (
    <Card className='space-y-3 p-6 sm:col-span-2'>
      <div className='flex items-center justify-between'>
        <span className='text-4xl font-semibold'>{value}</span>
        <div className='border-border rounded-full border p-2 [&_svg]:size-5'>
          {icon}
        </div>
      </div>
      <p className='text-foreground-soft text-xs uppercase'>{title}</p>
    </Card>
  )
}
