import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/class-name-merge'

const cardVariants = cva('overflow-hidden rounded-2xl border p-4', {
  variants: {
    variant: {
      default: 'bg-card border-border shadow-xs',
      info: 'bg-accent/75 border-border',
      warning: 'bg-warning/5 border-warning/25',
      error: 'bg-error/5 border-error/25',
      success: 'bg-success/5 border-success/25',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>

export function Card({ variant, className, ...props }: Readonly<CardProps>) {
  return <div className={cn(cardVariants({ variant, className }))} {...props} />
}
