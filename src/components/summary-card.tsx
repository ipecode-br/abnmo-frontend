import type { LucideIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { Card, type CardProps } from './ui/card'
import { Skeleton } from './ui/skeleton'

interface SummaryCardProps extends CardProps {
  label: string
  icon: LucideIcon
  value?: number | string
  loading?: boolean
}

export function SummaryCard({
  label,
  icon: Icon,
  value = 0,
  className,
  loading,
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
        {loading ? (
          <Skeleton className='size-10' />
        ) : (
          <span className='text-4xl leading-none font-semibold'>{value}</span>
        )}

        <div className='border-border text-primary rounded-full border p-2 [&_svg]:size-5'>
          <Icon />
        </div>
      </div>
      <p className='text-foreground-soft text-sm uppercase'>{label}</p>
    </Card>
  )
}
