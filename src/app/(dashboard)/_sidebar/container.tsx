'use client'

import { ChevronRightIcon } from 'lucide-react'
import type React from 'react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

export function DashboardSidebarContainer({
  className,
  ...props
}: Readonly<React.ComponentProps<'aside'>>) {
  const expanded = useSidebar((state) => state.expanded)
  const toogleSidebar = useSidebar((state) => state.toogleSidebar)

  return (
    <div className='relative'>
      <aside
        className={cn(
          'border-border flex h-screen shrink-0 flex-col gap-8 overflow-x-hidden overflow-y-auto border-r py-6 transition-all duration-500',
          className,
          expanded ? 'w-56 px-6' : 'w-18 px-4',
        )}
        {...props}
      />

      <Button
        size='icon'
        variant='outline'
        data-expanded={expanded}
        className={cn(
          'text-disabled hover:text-foreground-soft absolute top-20 -right-4 z-10 size-8 rounded-full transition-all delay-75 duration-300 [&_svg]:size-5',
          'data-[expanded=true]:rotate-180',
        )}
        onClick={toogleSidebar}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
