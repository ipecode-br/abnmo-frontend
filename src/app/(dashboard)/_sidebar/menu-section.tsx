'use client'

import { usePathname } from 'next/navigation'

import { NavButton } from '@/components/ui/nav-button'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

interface DashboardSidebarMenuSectionProps {
  sections: {
    id: string
    links: {
      label: string
      icon: React.ReactNode
      path: string
    }[]
  }[]
}

export function DashboardSidebarMenuSection({
  sections,
}: Readonly<DashboardSidebarMenuSectionProps>) {
  const expanded = useSidebar((state) => state.expanded)
  const pathname = usePathname()

  return (
    <section className='mb-auto space-y-8'>
      {sections.map((section) => (
        <section key={section.id} className='transition-all'>
          <nav className='flex flex-col gap-2'>
            {section.links.map((link) => {
              const isActive = link.path === pathname
              return (
                <NavButton
                  key={link.label}
                  variant='ghost'
                  href={link.path}
                  data-visible={expanded}
                  data-active={isActive}
                  className={cn(
                    '[&_svg]:text-disabled text-foreground-soft size-10 justify-start gap-3 px-2.5 text-base transition-all duration-300',
                    'data-[visible=true]:w-full',
                    'data-[active=true]:bg-accent data-[active=true]:text-primary data-[active=true]:[&_svg]:text-primary data-[active=true]:pointer-events-none data-[active=true]:size-10',
                  )}
                >
                  {link.icon}
                  <span
                    data-visible={expanded}
                    className='opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100 data-[visible=true]:delay-150'
                  >
                    {link.label}
                  </span>
                </NavButton>
              )
            })}
          </nav>
        </section>
      ))}
    </section>
  )
}
