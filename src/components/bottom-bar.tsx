'use client'

import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  LayoutDashboardIcon,
  MenuIcon,
  Users2Icon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import { usePermissions } from '@/hooks/use-permissions'

import { NavButton } from './ui/nav-button'

export function BottomBar() {
  const { canUser } = usePermissions()
  const pathname = usePathname()

  const BOTTOM_BAR_BUTTONS = [
    {
      label: 'Visão geral',
      icon: <LayoutDashboardIcon />,
      path: ROUTES.dashboard.main,
      show: true,
    },
    {
      label: 'Catalogação',
      icon: <ClipboardListIcon />,
      path: ROUTES.dashboard.surveys.main,
      show: canUser(['read:survey', 'read:survey:others']),
    },
    {
      label: 'Pacientes',
      icon: <Users2Icon />,
      path: ROUTES.dashboard.patients.main,
      show: canUser(['read:patient', 'read:patient:others']),
    },
    {
      label: 'Atendimentos',
      icon: <ClipboardCheckIcon />,
      path: ROUTES.dashboard.appointments.main,
      show: canUser(['read:appointment', 'read:appointment:others']),
    },
    {
      label: 'Menu',
      icon: <MenuIcon />,
      path: ROUTES.dashboard.menu,
      show: true,
    },
  ]

  return (
    <nav className='bg-background border-border flex h-16 w-full items-center justify-evenly border-t lg:hidden'>
      {BOTTOM_BAR_BUTTONS.map((button) => {
        if (!button.show) return null

        return (
          <NavButton
            variant='ghost'
            key={button.path}
            href={button.path}
            aria-label={button.label}
            data-active={button.path === pathname}
            className='data-[active=true]:text-primary data-[active=true]:bg-background-soft size-10 [&_svg]:size-6'
          >
            {button.icon}
          </NavButton>
        )
      })}
    </nav>
  )
}
