import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { Card, type CardProps } from './ui/card'

interface SummaryCardProps extends CardProps {
  label: string
  icon: LucideIcon
  value?: number | string
}

export function SummaryCard({
  label,
  icon: Icon,
  value = 0,
  className,
  ...props
}: Readonly<SummaryCardProps>) {
  return (
    <Card
      className={cn(
        'flex min-h-30 flex-col justify-between gap-3 p-6',
        className,
      )}
      {...props}
    >
      <div className='flex items-center justify-between'>
        <span className='text-4xl font-semibold'>{value}</span>
        <div className='border-border text-primary rounded-full border p-2 [&_svg]:size-5'>
          <Icon />
        </div>
      </div>
      <p className='text-foreground-soft text-sm uppercase'>{label}</p>
    </Card>
  )
}
