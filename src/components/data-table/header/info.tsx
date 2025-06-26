'use client'

import { Slot } from '@radix-ui/react-slot'

interface DataTableHeaderInfoProps {
  icon: React.ReactNode
  total?: number
  title: string
  emptyTitle: string
}

export function DataTableHeaderInfo({
  icon,
  total,
  title,
  emptyTitle,
}: Readonly<DataTableHeaderInfoProps>) {
  return (
    <div className='flex items-center gap-4'>
      <div className='bg-border/50 flex size-10 items-center justify-center rounded-lg'>
        <Slot className='text-primary size-5.5'>{icon}</Slot>
      </div>

      {total && total > 0 ? (
        <div className='flex items-center gap-2'>
          <p className='text-2xl font-semibold'>{total}</p>
          <p className='text-foreground-soft'>{title}</p>
        </div>
      ) : (
        <p className='text-foreground-soft'>{emptyTitle}</p>
      )}
    </div>
  )
}
