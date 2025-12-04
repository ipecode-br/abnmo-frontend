'use client'
import { usePathname } from 'next/navigation'

import { NavButton } from '@/components/ui/nav-button'
import { cn } from '@/utils/class-name-merge'

interface SettingsMenuSectionProps {
  sections: {
    id: string
    links: {
      label: string
      icon: React.ReactNode
      path: string
    }[]
  }[]
}

export function SettingsMenuSection({
  sections,
}: Readonly<SettingsMenuSectionProps>) {
  const pathname = usePathname()

  return (
    <section className='mb-auto space-y-8'>
      {sections.map((section) => (
        <section key={section.id}>
          <nav className='flex flex-col gap-2'>
            {section.links.map((link) => {
              const isActive = link.path === pathname

              return (
                <NavButton
                  key={link.label}
                  variant='ghost'
                  href={link.path}
                  data-active={isActive}
                  className={cn(
                    '[&_svg]:text-disabled text-foreground-soft data-[active=true]:text-primary-foreground data-[active=true]:[&_svg]:text-primary-foreground data-[active=true]:bg-primary min-w-full justify-start gap-3 px-2.5 data-[active=true]:pointer-events-none data-[active=true]:size-10',
                  )}
                >
                  {link.icon}
                  {link.label}
                </NavButton>
              )
            })}
          </nav>
        </section>
      ))}
    </section>
  )
}
