import type { LucideIcon } from 'lucide-react'

import { Card, type CardProps } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { cn } from '@/utils/class-name-merge'

interface DashboardCardChartProps extends CardProps {
  title: string
  icon: LucideIcon
}

export function DashboardCardChart({
  icon,
  title,
  className,
  children,
  ...props
}: Readonly<DashboardCardChartProps>) {
  const Icon = icon
  return (
    <Card className={cn('space-y-2', className)} {...props}>
      <header className='flex items-center gap-2'>
        <Icon className='size-5' />
        <h3 className='font-medium'>{title}</h3>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label='Abrir menu'
            className='ml-auto rounded-lg'
            indicator
          >
            No último ano
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem>No último mês</DropdownMenuItem>
            <DropdownMenuItem>Na última semana</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <Divider />
      {children}
    </Card>
  )
}
