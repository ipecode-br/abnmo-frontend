import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Card, type CardProps } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { cn } from '@/utils/class-name-merge'

interface DashboardCardChartProps extends CardProps {
  title: string
  icon: LucideIcon
  menu?: ReactNode
}

export function DashboardCardChart({
  icon,
  title,
  menu,
  className,
  children,
  ...props
}: Readonly<DashboardCardChartProps>) {
  const Icon = icon
  return (
    <Card className={cn('flex flex-col gap-3 p-6', className)} {...props}>
      <header className='flex items-center gap-2'>
        <Icon className='size-5' />
        <h3 className='text-lg font-medium'>{title}</h3>

        {menu && <div className='ml-auto'>{menu}</div>}
      </header>
      <Divider />
      {children}
    </Card>
  )
}
