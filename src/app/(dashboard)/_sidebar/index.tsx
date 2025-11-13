import {
  BoltIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  Share2Icon,
  UserRoundCheckIcon,
  Users2Icon,
} from 'lucide-react'

import { getProfile } from '@/actions/users'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

import { SidebarAccount } from './account'
import { DashboardSidebarContainer } from './container'
import { SidebarHeader } from './header'
import { DashboardSidebarMenuSection } from './menu-section'

export async function DashboardSidebar() {
  const user = await getProfile()

  return (
    <DashboardSidebarContainer>
      <SidebarHeader />

      <Divider />

      <DashboardSidebarMenuSection sections={SIDEBAR_SECTIONS} />

      <Divider />

      <SidebarAccount user={user!} />
    </DashboardSidebarContainer>
  )
}

const SIDEBAR_SECTIONS = [
  {
    id: 'common',
    links: [
      {
        label: 'Visão Geral',
        icon: <LayoutDashboardIcon />,
        path: ROUTES.dashboard.main,
      },
      {
        label: 'Pacientes',
        icon: <Users2Icon />,
        path: ROUTES.dashboard.patients.main,
      },
      {
        label: 'Encaminhados',
        icon: <Share2Icon />,
        path: ROUTES.dashboard.referrals.main,
      },
      {
        label: 'Aprovações',
        icon: <UserRoundCheckIcon />,
        path: ROUTES.dashboard.approvals.main,
      },
      {
        label: 'Equipe',
        icon: <HeartHandshakeIcon />,
        path: ROUTES.dashboard.teams.main,
      },
    ],
  },
  {
    id: 'others',
    links: [
      {
        label: 'Configurações',
        icon: <BoltIcon />,
        path: ROUTES.dashboard.settings.main,
      },
      // {
      //   label: 'Suporte',
      //   icon: <HeadsetIcon />,
      //   path: ROUTES.dashboard.support.main,
      // },
    ],
  },
]
