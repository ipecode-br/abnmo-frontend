import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/class-name-merge'

const alertVariants = cva('rounded-lg border px-3 py-2 text-sm', {
  variants: {
    variant: {
      default: 'border-disabled/50 bg-disabled/5 text-foreground',
      error: 'border-error text-error bg-error/5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type AlertProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    error?: boolean
  }

export function Alert({
  variant,
  error,
  className,
  ...props
}: Readonly<AlertProps>) {
  return (
    <div
      className={cn(
        alertVariants({ variant: error ? 'error' : variant, className }),
      )}
      {...props}
    />
  )
}
