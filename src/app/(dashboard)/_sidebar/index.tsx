'use client'
import {
  Bolt,
  Headset,
  LayoutDashboard,
  Share2,
  UserRoundCheck,
  Users2Icon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/class-name-merge'

import { SidebarAccount } from './account'
import { SidebarHeader } from './header'
import { SidebarHelpCard } from './help-card'

export function DashboardSidebar() {
  const pathName = usePathname()

  return (
    <aside className='border-border flex h-screen w-68 shrink-0 flex-col gap-8 border-r p-6'>
      <SidebarHeader />

      <section className='mb-auto space-y-8'>
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className='text-disabled mb-4 text-xs font-medium uppercase'>
              {section.title}
            </p>
            <nav className='flex flex-col gap-2'>
              {section.links.map((link) => {
                const isActive = link.path === pathName
                return (
                  <NavButton
                    key={link.label}
                    variant='ghost'
                    href={link.path}
                    size='lg'
                    className={cn(
                      '[&_svg]:text-disabled text-foreground-soft justify-start gap-3',
                      isActive && 'bg-accent pointer-events-none',
                    )}
                  >
                    {link.icon}
                    {link.label}
                  </NavButton>
                )
              })}
            </nav>
          </div>
        ))}
      </section>

      <SidebarHelpCard />
      <SidebarAccount />
    </aside>
  )
}

const SIDEBAR_SECTIONS = [
  {
    title: 'Geral',
    links: [
      {
        label: 'Visão Geral',
        icon: <LayoutDashboard />,
        path: ROUTES.dashboard.main,
      },
      {
        label: 'Pacientes',
        icon: <Users2Icon />,
        path: ROUTES.dashboard.patients.main,
      },
      {
        label: 'Encaminhados',
        icon: <Share2 />,
        path: ROUTES.dashboard.forwarded.main,
      },
      {
        label: 'Aprovações',
        icon: <UserRoundCheck />,
        path: ROUTES.dashboard.approvals.main,
      },
    ],
  },
  {
    title: 'Outros',
    links: [
      {
        label: 'Configurações',
        icon: <Bolt />,
        path: ROUTES.dashboard.settings.main,
      },
      {
        label: 'Suporte',
        icon: <Headset />,
        path: ROUTES.dashboard.support.main,
      },
    ],
  },
]
