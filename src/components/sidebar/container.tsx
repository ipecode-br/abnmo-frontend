'use client'

import { ChevronRightIcon } from 'lucide-react'
import type React from 'react'
import { createContext, useCallback, useContext, useState } from 'react'

import { toggleSidebar } from '@/actions/sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'

interface SidebarContextValue {
  expanded: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)

  if (!context) {
    throw new Error('useSidebar must be used within SidebarContainer')
  }

  return context
}

interface SidebarContainerProps {
  initialExpanded?: boolean
  className?: string
  children: React.ReactNode
}

export function SidebarContainer({
  initialExpanded = true,
  className,
  children,
}: SidebarContainerProps) {
  const [expanded, setExpanded] = useState(initialExpanded)

  const handleToggle = useCallback(() => {
    setExpanded(!expanded)
    toggleSidebar(!expanded)
  }, [expanded])

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar: handleToggle }}>
      <div className='bg-background relative max-lg:hidden'>
        <aside
          data-expanded={expanded}
          className={cn(
            'border-border flex h-svh w-18 shrink-0 flex-col gap-8 overflow-x-hidden overflow-y-auto border-r px-4 py-6 transition-all duration-500',
            'data-[expanded=true]:w-64 data-[expanded=true]:px-6',
            className,
          )}
        >
          {children}
        </aside>

        <Button
          variant='outline'
          onClick={handleToggle}
          data-expanded={expanded}
          className='text-disabled hover:text-foreground-soft absolute top-20 -right-4 z-10 size-8 rounded-full p-0 transition-all delay-75 duration-300 data-[expanded=true]:rotate-180 [&_svg]:size-5'
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </SidebarContext.Provider>
  )
}
