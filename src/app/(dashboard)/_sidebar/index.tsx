'use client'
import {
  Bolt,
  Headset,
  LayoutDashboard,
  Share2,
  UserRoundCheck,
  UserRoundSearch,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { NavButton } from '@/components/ui/nav-button'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/class-name-merge'

import { SidebarHeader } from './header'
import { SidebarHelpCard } from './help-card'
import { SidebarNavSection } from './nav-section'
import { SidebarUserInfo } from './user-info'

export function DashboardSidebar() {
  const pathName = usePathname()
  return (
    <aside className='border-border flex h-screen w-68 flex-col border-r px-6 py-8'>
      <div className='flex flex-1 flex-col gap-8 overflow-y-auto'>
        <SidebarHeader name='Cleide Systems' />
        {SIDEBAR_SECTION.map((section) => (
          <SidebarNavSection key={section.title} title={section.title}>
            {section.links.map((link) => {
              const isActive = link.path === pathName
              return (
                <NavButton
                  key={link.label}
                  variant='ghost'
                  href={link.path}
                  size='lg'
                  className={cn(
                    'text-foreground-soft justify-start',
                    isActive && 'bg-accent hover:bg-accent',
                  )}
                >
                  {link.icon}
                  {link.label}
                </NavButton>
              )
            })}
          </SidebarNavSection>
        ))}
        <SidebarHelpCard />
      </div>
      <SidebarUserInfo name='Claudio Oliveira' role='Enfermagem' />
    </aside>
  )
}

const SIDEBAR_SECTION = [
  {
    title: 'Geral',
    links: [
      {
        label: 'Visão geral',
        icon: <LayoutDashboard />,
        path: ROUTES.dashboard.main,
      },
      {
        label: 'Pacientes',
        icon: <UserRoundSearch />,
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
