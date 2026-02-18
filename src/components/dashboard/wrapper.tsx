'use client'

import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

export function DashboardWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const expanded = useSidebar((state) => state.expanded)

  return (
    <div
      className={cn(
        'flex min-h-svh flex-col overflow-hidden transition-all duration-500',
        expanded ? 'pl-64' : 'pl-18',
      )}
    >
      {children}
    </div>
  )
}
