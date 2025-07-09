'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/class-name-merge'

const iconVariants = cva('size-5.5', {
  variants: {
    variant: {
      primary: 'text-primary',
      ghost: 'text-black',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export interface DataTableHeaderInfoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconVariants> {
  icon: React.ReactNode
  total?: number
  title: string
  emptyTitle?: string
}

export function DataTableHeaderInfo({
  icon,
  total,
  title,
  emptyTitle,
  className,
  variant,
}: Readonly<DataTableHeaderInfoProps>) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className='bg-border/50 flex size-10 items-center justify-center rounded-lg'>
        <Slot className={cn(iconVariants({ variant }))}>{icon}</Slot>
      </div>

      <div className='flex items-center gap-2'>
        {total !== undefined && total > 0 ? (
          <>
            <p className='text-2xl font-semibold'>{total}</p>
            <p className='text-foreground-soft'>{title}</p>
          </>
        ) : total === undefined ? (
          <p className='text-2xl font-medium'>{title}</p>
        ) : (
          <p className='text-foreground-soft'>{emptyTitle}</p>
        )}
      </div>
    </div>
  )
}
