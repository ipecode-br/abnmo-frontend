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
  loading,
  className,
  value = 0,
  icon: Icon,
  ...props
}: Readonly<SummaryCardProps>) {
  return (
    <>
      <Card
        className={cn('flex items-start justify-between gap-4', className)}
        {...props}
      >
        <div className='flex flex-col gap-1'>
          {loading ? (
            <Skeleton className='h-9 w-12' />
          ) : (
            <span className='text-4xl leading-none font-semibold'>{value}</span>
          )}
          <span className='text-foreground-soft text-sm uppercase'>
            {label}
          </span>
        </div>
        <div className='border-border text-primary flex size-11 shrink-0 items-center justify-center rounded-full border [&_svg]:size-5.5'>
          <Icon />
        </div>
      </Card>
    </>
  )
}
