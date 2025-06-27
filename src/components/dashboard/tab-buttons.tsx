'use client'

import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/utils/class-name-merge'

interface DashboardTabButtonsProps {
  buttons: Array<{ title: string; path: string }>
}

// TODO: add focus state style
export function DashboardTabButtons({
  buttons,
}: Readonly<DashboardTabButtonsProps>) {
  const currentPathname = usePathname()
  const router = useRouter()

  return (
    <section className='border-border border-b px-8'>
      {buttons.map((button) => {
        const isActive = button.path === currentPathname
        return (
          <button
            key={button.path}
            disabled={isActive}
            onClick={() => router.push(button.path)}
            className={cn(
              'text-disabled hover:text-foreground cursor-pointer border-b-2 border-transparent px-4 pt-4 pb-3 text-sm font-medium transition-colors',
              isActive &&
                'border-foreground text-foreground pointer-events-none',
            )}
          >
            {button.title}
          </button>
        )
      })}
    </section>
  )
}
