import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/class-name-merge'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: Readonly<CardProps>) {
  return (
    <div
      className={cn('rounded-2xl border p-4 shadow-xs', className)}
      {...props}
    />
  )
}
