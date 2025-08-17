'use client'

import type React from 'react'

import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

export function DashboardSidebarContainer({
  className,
  ...props
}: Readonly<React.ComponentProps<'aside'>>) {
  const expanded = useSidebar((state) => state.expanded)

  return (
    <aside
      className={cn(
        'border-border flex min-h-screen shrink-0 flex-col gap-8 border-r py-6 transition-all duration-500',
        className,
        expanded ? 'w-68 px-6' : 'w-18 px-4',
      )}
      {...props}
    />
  )
}
