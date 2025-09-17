import React from 'react'

import { cn } from '@/utils/class-name-merge'

interface SkeletonProps extends React.ComponentProps<'div'> {
  quantity?: number
}

export function Skeleton({
  quantity = 1,
  className,
  ...props
}: Readonly<SkeletonProps>) {
  const array = Array.from({ length: quantity }).map((_, index) => index + 1)

  return array.map((item) => (
    <div
      key={item}
      className={cn('bg-accent animate-pulse rounded-lg', className)}
      {...props}
    />
  ))
}
