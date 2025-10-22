'use client'

import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/utils/class-name-merge'

interface DashboardTabButtonsProps {
  buttons: Array<{ title: string; path: string }>
}

export function DashboardTabButtons({
  buttons,
}: Readonly<DashboardTabButtonsProps>) {
  const currentPathname = usePathname()
  const router = useRouter()

  return (
    <section className='border-border flex gap-6 border-b px-8'>
      {buttons.map((button) => {
        const isActive = button.path === currentPathname
        return (
          <button
            key={button.path}
            disabled={isActive}
            data-active={isActive}
            onClick={() => router.push(button.path)}
            className={cn(
              'text-disabled hover:text-foreground focus-visible:ring-ring focus-visible:outline-ring relative top-px cursor-pointer border-b-2 border-transparent pt-4 pb-3 text-sm font-medium transition-all',
              'data-[active=true]:border-primary data-[active=true]:text-foreground data-[active=true]:pointer-events-none',
            )}
          >
            {button.title}
          </button>
        )
      })}
    </section>
  )
}
