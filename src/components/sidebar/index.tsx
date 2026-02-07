import {
  ClipboardListIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  Share2Icon,
  Users2Icon,
} from 'lucide-react'

import { getCurrentUser } from '@/actions/users'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

import { SidebarAccount } from './account'
import { SidebarContainer } from './container'
import { SidebarHeader } from './header'
import { SidebarMenuSection } from './menu-section'

export async function DashboardSidebar() {
  const user = await getCurrentUser()

  return (
    <SidebarContainer>
      <SidebarHeader />

      <Divider />

      <SidebarMenuSection sections={SIDEBAR_SECTIONS} />

      <Divider />

      <SidebarAccount user={user} />
    </SidebarContainer>
  )
}

const SIDEBAR_SECTIONS = [
  {
    id: 'main',
    links: [
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
        icon: <ClipboardListIcon />,
        path: ROUTES.dashboard.appointments.main,
      },
      {
        label: 'Encaminhamentos',
        icon: <Share2Icon />,
        path: ROUTES.dashboard.referrals.main,
      },
      // TODO: uncomment approvals when it's ready
      // {
      //   label: 'Aprovações',
      //   icon: <UserRoundCheckIcon />,
      //   path: ROUTES.dashboard.approvals.pendingApprovals,
      // },
      {
        label: 'Equipe',
        icon: <HeartHandshakeIcon />,
        path: ROUTES.dashboard.users.main,
      },
    ],
  },
  // TODO: uncomment utils when it's ready
  // {
  //   id: 'utils',
  //   links: [
  //     {
  //       label: 'Configurações',
  //       icon: <BoltIcon />,
  //       path: ROUTES.dashboard.settings.main,
  //     },
  //   ],
  // },
]
