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

import { Divider } from '@/components/ui/divider'
import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

import { SidebarAccount } from './account'
import { SidebarHeader } from './header'
import { SidebarHelpCard } from './help-card'

export function DashboardSidebar() {
  const expanded = useSidebar((state) => state.expanded)
  const pathName = usePathname()

  return (
    <aside
      className={cn(
        'border-border flex min-h-screen shrink-0 flex-col gap-8 border-r transition-all',
        expanded ? 'w-68 p-6' : 'w-18 p-4',
      )}
    >
      <SidebarHeader />

      <Divider />

      <section className='mb-auto space-y-8'>
        {SIDEBAR_SECTIONS.map((section) => (
          <section key={section.title} className='transition-all'>
            {expanded && (
              <p className='text-disabled mb-4 text-xs font-medium uppercase'>
                {section.title}
              </p>
            )}
            <nav className='flex flex-col gap-2'>
              {section.links.map((link) => {
                const isActive = link.path === pathName
                return (
                  <NavButton
                    key={link.label}
                    variant='ghost'
                    href={link.path}
                    size={expanded ? 'lg' : 'icon'}
                    className={cn(
                      '[&_svg]:text-disabled text-foreground-soft gap-3 transition-all',
                      expanded && 'justify-start',
                      isActive && 'bg-accent pointer-events-none',
                    )}
                  >
                    {link.icon}
                    {expanded && link.label}
                  </NavButton>
                )
              })}
            </nav>
          </section>
        ))}
      </section>

      <SidebarHelpCard />

      <Divider />

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
