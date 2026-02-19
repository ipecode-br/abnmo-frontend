'use client'

import { ChevronRightIcon } from 'lucide-react'
import type React from 'react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

export function SidebarContainer({
  className,
  ...props
}: Readonly<React.ComponentProps<'aside'>>) {
  const expanded = useSidebar((state) => state.expanded)
  const toogleSidebar = useSidebar((state) => state.toogleSidebar)

  return (
    <div className='bg-background relative max-lg:hidden'>
      <aside
        data-expanded={expanded}
        className={cn(
          'border-border flex h-svh w-18 shrink-0 flex-col gap-8 overflow-x-hidden overflow-y-auto border-r px-4 py-6 transition-all duration-500',
          'data-[expanded=true]:w-64 data-[expanded=true]:px-6',
          className,
        )}
        {...props}
      />

      <Button
        size='icon'
        variant='outline'
        data-expanded={expanded}
        onClick={toogleSidebar}
        className='text-disabled hover:text-foreground-soft absolute top-20 -right-4 z-10 size-8 rounded-full transition-all delay-75 duration-300 data-[expanded=true]:rotate-180 [&_svg]:size-5'
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
