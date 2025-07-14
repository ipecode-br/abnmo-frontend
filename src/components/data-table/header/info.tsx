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
  const renderContent = () => {
    if (total !== undefined && total > 0) {
      return (
        <>
          <p className='text-2xl font-semibold'>{total}</p>
          <p className='text-foreground-soft'>{title}</p>
        </>
      )
    }

    if (total === undefined) {
      return <p className='text-2xl font-medium'>{title}</p>
    }

    return <p className='text-foreground-soft'>{emptyTitle}</p>
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className='bg-border/50 flex size-10 items-center justify-center rounded-lg'>
        <Slot className={cn(iconVariants({ variant }))}>{icon}</Slot>
      </div>

      <div className='flex items-center gap-2'>{renderContent()}</div>
    </div>
  )
}
