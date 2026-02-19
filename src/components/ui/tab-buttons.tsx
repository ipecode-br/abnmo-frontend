'use client'

import { ScrollArea } from '@base-ui-components/react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/utils/class-name-merge'

interface TabButtonsProps {
  buttons: Array<{ title: string; path: string }>
  className?: string
}

export function TabButtons({
  buttons,
  className,
  ...props
}: Readonly<TabButtonsProps>) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <ScrollArea.Root>
      <ScrollArea.Viewport
        className={cn('relative top-px flex gap-8', className)}
        {...props}
      >
        {buttons.map((button) => {
          const isActive = button.path === pathname
          return (
            <button
              key={button.path}
              disabled={isActive}
              data-active={isActive}
              onClick={() => router.push(button.path)}
              className='text-disabled hover:text-foreground focus-visible:text-primary focus-visible:border-primary data-[active=true]:border-primary data-[active=true]:text-foreground cursor-pointer border-b-2 border-transparent pt-4 pb-3 font-medium transition-all outline-none data-[active=true]:pointer-events-none'
            >
              {button.title}
            </button>
          )
        })}
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='horizontal'
        className={cn(
          'bg-border pointer-events-none top-1 mx-4 flex h-1 rounded opacity-0 transition-opacity',
          'data-[scrolling]:pointer-events-auto data-[scrolling]:opacity-100 data-[scrolling]:duration-0',
        )}
      >
        <ScrollArea.Thumb className='bg-foreground-soft/60 w-full rounded' />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
