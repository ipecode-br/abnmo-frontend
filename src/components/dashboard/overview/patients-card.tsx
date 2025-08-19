import { Card } from '@/components/ui/card'

interface DashboardOverviewPatientsCard {
  title: string | React.ReactNode
  value: number
  icon: React.ReactNode
  variant?: 'default' | 'active' | 'inactive'
}

export function DashboardOverviewPatientsCard({
  title,
  value,
  icon,
}: Readonly<DashboardOverviewPatientsCard>) {
  return (
    <Card className='p-6'>
      <div className='flex items-start justify-between space-y-3'>
        <span className='text-4xl font-semibold'>{value}</span>
        <div className='border-border rounded-full border p-2 [&_svg]:size-5'>
          {icon}
        </div>
      </div>
      <p className='text-disabled text-xs uppercase'>{title}</p>
    </Card>
  )
}
