'use client'

import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/utils/class-name-merge'

interface TabButtonsProps extends React.ComponentProps<'section'> {
  buttons: Array<{ title: string; path: string }>
}

export function TabButtons({
  buttons,
  className,
  ...props
}: Readonly<TabButtonsProps>) {
  const currentPathname = usePathname()
  const router = useRouter()

  return (
    <section className={cn('relative top-px flex gap-6', className)} {...props}>
      {buttons.map((button) => {
        const isActive = button.path === currentPathname
        return (
          <button
            key={button.path}
            disabled={isActive}
            data-active={isActive}
            onClick={() => router.push(button.path)}
            className='text-disabled hover:text-foreground focus-visible:ring-ring focus-visible:outline-ring data-[active=true]:border-primary data-[active=true]:text-foreground cursor-pointer border-b-2 border-transparent pt-4 pb-3 text-sm font-medium transition-all data-[active=true]:pointer-events-none'
          >
            {button.title}
          </button>
        )
      })}
    </section>
  )
}
