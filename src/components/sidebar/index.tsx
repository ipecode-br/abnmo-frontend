import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClipboardPasteIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  Users2Icon,
} from 'lucide-react'

import { canUser } from '@/actions/auth/can-user'
import { getCookie } from '@/actions/cookies'
import { getCurrentUser } from '@/actions/users/get-current-user'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

import { SidebarAccount } from './account'
import { SidebarContainer } from './container'
import { SidebarHeader } from './header'
import { SidebarMenuSection } from './menu-section'

export async function Sidebar() {
  const sidebarCookie = await getCookie('sidebar_expanded')
  const initialExpanded = sidebarCookie ? sidebarCookie === 'true' : true

  const [
    user,
    canViewSurveys,
    canViewPatients,
    canViewAppointments,
    canViewReferrals,
    canViewUsers,
  ] = await Promise.all([
    getCurrentUser(),
    canUser('read:survey:others'),
    canUser('read:patient:others'),
    canUser(['read:appointment', 'read:appointment:others']),
    canUser(['read:referral', 'read:referral:others']),
    canUser('read:user:others'),
  ])

  const SECTIONS = [
    {
      id: 'main',
      buttons: [
        {
          label: 'Visão geral',
          icon: <LayoutDashboardIcon />,
          path: ROUTES.main,
          show: true,
        },
        {
          label: 'Catalogação',
          icon: <ClipboardListIcon />,
          path: ROUTES.surveys.main,
          show: canViewSurveys,
        },
        {
          label: 'Pacientes',
          icon: <Users2Icon />,
          path: ROUTES.patients.main,
          show: canViewPatients,
        },
        {
          label: 'Atendimentos',
          icon: <ClipboardCheckIcon />,
          path: ROUTES.appointments.main,
          show: canViewAppointments,
        },
        {
          label: 'Encaminhamentos',
          icon: <ClipboardPasteIcon />,
          path: ROUTES.referrals.main,
          show: canViewReferrals,
        },
        // TODO: uncomment approvals when it's ready
        // {
        //   label: 'Aprovações',
        //   icon: <UserRoundCheckIcon />,
        //   path: ROUTES.approvals.pendingApprovals,
        // show: true,
        // },
        {
          label: 'Equipe',
          icon: <HeartHandshakeIcon />,
          path: ROUTES.users.main,
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
    //       path: ROUTES.settings.main,
    // show: true,
    //     },
    //   ],
    // },
  ]

  return (
    <SidebarContainer initialExpanded={initialExpanded}>
      <SidebarHeader />

      <Divider />

      <SidebarMenuSection sections={SECTIONS} />

      <Divider />

      <SidebarAccount user={user} />
    </SidebarContainer>
  )
}
