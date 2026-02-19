'use client'

import {
  ClipboardCheckIcon,
  ClipboardPasteIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  MenuIcon,
  Users2Icon,
} from 'lucide-react'
import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/routes'

import { NavButton } from './ui/nav-button'

export function BottomBar() {
  const pathname = usePathname()

  return (
    <nav className='bg-background border-border flex h-16 w-full items-center justify-evenly border-t lg:hidden'>
      {BOTTOM_BAR_BUTTONS.map((button) => (
        <NavButton
          size='icon'
          variant='ghost'
          key={button.path}
          href={button.path}
          data-active={button.path === pathname}
          className='data-[active=true]:text-primary data-[active=true]:bg-background-soft [&_svg]:size-6'
        >
          {button.icon}
        </NavButton>
      ))}
    </nav>
  )
}

const BOTTOM_BAR_BUTTONS = [
  {
    label: 'Visão geral',
    icon: <LayoutDashboardIcon />,
    path: ROUTES.dashboard.main,
  },
  {
    label: 'Pacientes',
    icon: <Users2Icon />,
    path: ROUTES.dashboard.patients.main,
  },
  {
    label: 'Atendimentos',
    icon: <ClipboardCheckIcon />,
    path: ROUTES.dashboard.appointments.main,
  },
  {
    label: 'Encaminhamentos',
    icon: <ClipboardPasteIcon />,
    path: ROUTES.dashboard.referrals.main,
  },
  {
    label: 'Menu',
    icon: <MenuIcon />,
    path: ROUTES.dashboard.menu,
  },
]
