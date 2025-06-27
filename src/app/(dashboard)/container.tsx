import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/class-name-merge'

type DashboardContainerProps = HTMLAttributes<HTMLDivElement>

export function DashboardContainer({
  className,
  ...props
}: Readonly<DashboardContainerProps>) {
  return (
    <main
      className={cn('bg-background-soft flex-1 p-8', className)}
      {...props}
    />
  )
}
