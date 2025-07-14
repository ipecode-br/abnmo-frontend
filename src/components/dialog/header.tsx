'use client'

import { cn } from '@/utils/class-name-merge'

export function DialogHeader({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5 sm:text-left', className)}
      {...props}
    />
  )
}
