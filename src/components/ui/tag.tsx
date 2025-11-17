import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/class-name-merge'

const tagVariants = cva(
  'flex w-fit items-center gap-1 border font-medium transition-colors [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        outlined: 'bg-background text-foreground-soft border-border',
        info: 'bg-border/50 text-foreground border-border',
        warning: 'bg-warning/15 text-warning border-warning/25',
        error: 'bg-error/15 text-error border-error/25',
        success: 'bg-success/15 text-success border-success/25',
      },
      size: {
        default: 'rounded-lg px-3 py-2 text-sm leading-none [&_svg]:size-5',
        sm: 'rounded-md px-2 py-1.5 text-sm leading-none [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'default',
    },
  },
)

export type TagProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof tagVariants>

export function Tag({
  variant,
  size,
  className,
  ...props
}: Readonly<TagProps>) {
  return (
    <div className={cn(tagVariants({ variant, size, className }))} {...props} />
  )
}
