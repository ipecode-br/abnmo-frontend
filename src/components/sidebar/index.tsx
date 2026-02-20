import {
  ClipboardCheckIcon,
  ClipboardPasteIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  Users2Icon,
} from 'lucide-react'

import { canUser } from '@/actions/auth/can-user'
import { getCurrentUser } from '@/actions/users/get-current-user'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

import { SidebarAccount } from './account'
import { SidebarContainer } from './container'
import { SidebarHeader } from './header'
import { SidebarMenuSection } from './menu-section'

export async function DashboardSidebar() {
  const [user, canViewUsers] = await Promise.all([
    getCurrentUser(),
    canUser('view', 'Users'),
  ])

  const SECTIONS = [
    {
      id: 'main',
      buttons: [
        {
          label: 'Visão geral',
          icon: <LayoutDashboardIcon />,
          path: ROUTES.dashboard.main,
          show: true,
        },
        {
          label: 'Pacientes',
          icon: <Users2Icon />,
          path: ROUTES.dashboard.patients.main,
          show: true,
        },
        {
          label: 'Atendimentos',
          icon: <ClipboardCheckIcon />,
          path: ROUTES.dashboard.appointments.main,
          show: true,
        },
        {
          label: 'Encaminhamentos',
          icon: <ClipboardPasteIcon />,
          path: ROUTES.dashboard.referrals.main,
          show: true,
        },
        // TODO: uncomment approvals when it's ready
        // {
        //   label: 'Aprovações',
        //   icon: <UserRoundCheckIcon />,
        //   path: ROUTES.dashboard.approvals.pendingApprovals,
        // show: true,
        // },
        {
          label: 'Equipe',
          icon: <HeartHandshakeIcon />,
          path: ROUTES.dashboard.users.main,
          show: canViewUsers,
        },
      ],
    },
    // TODO: uncomment utils when it's ready
    // {
    //   id: 'utils',
    //   buttons: [
    //     {
    //       label: 'Configurações',
    //       icon: <BoltIcon />,
    //       path: ROUTES.dashboard.settings.main,
    // show: true,
    //     },
    //   ],
    // },
  ]

  return (
    <SidebarContainer>
      <SidebarHeader />

      <Divider />

      <SidebarMenuSection sections={SECTIONS} />

      <Divider />

      <SidebarAccount user={user} />
    </SidebarContainer>
  )
}
