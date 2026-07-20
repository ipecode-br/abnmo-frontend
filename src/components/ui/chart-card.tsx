import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Card, type CardProps } from '@/components/ui/card'
import { cn } from '@/utils/class-name-merge'

interface ChartCardProps extends CardProps {
  title: string
  icon: LucideIcon
  menu?: ReactNode
}

export function ChartCard({
  icon,
  title,
  menu,
  className,
  children,
  ...props
}: ChartCardProps) {
  const Icon = icon

  return (
    <Card className={cn('flex flex-col gap-4', className)} {...props}>
      <header className='border-border flex items-center gap-2 border-b pb-2'>
        <Icon className='text-disabled size-6 shrink-0' />
        <h3 className='text-xl font-medium'>{title}</h3>

        {menu && <div className='ml-auto'>{menu}</div>}
      </header>

      {children}
    </Card>
  )
}
