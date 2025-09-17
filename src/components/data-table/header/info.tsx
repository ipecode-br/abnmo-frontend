'use client'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderInfoProps {
  icon: React.ReactNode
  total?: number
  title?: string
  emptyTitle?: string
  iconClassName?: string
}

export function DataTableHeaderInfo({
  icon,
  total,
  title,
  emptyTitle,
  iconClassName,
}: Readonly<DataTableHeaderInfoProps>) {
  return (
    <div className='flex items-center gap-4'>
      <div className='bg-border/50 flex size-10 items-center justify-center rounded-lg'>
        <Slot className={cn('text-primary size-5.5', iconClassName)}>
          {icon}
        </Slot>
      </div>

      {total && total > 0 ? (
        <div className='flex items-center gap-2'>
          <p className='text-2xl font-semibold'>{total}</p>
          <p className='text-foreground-soft'>{title}</p>
        </div>
      ) : (
        <p className='text-foreground font-semibold'>{emptyTitle}</p>
      )}
    </div>
  )
}
