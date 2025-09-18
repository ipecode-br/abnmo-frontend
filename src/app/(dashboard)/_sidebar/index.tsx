import {
  Bolt,
  Headset,
  LayoutDashboard,
  Share2,
  UserRoundCheck,
  Users2Icon,
} from 'lucide-react'

import { getProfile } from '@/actions/users'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'

import { SidebarAccount } from './account'
import { DashboardSidebarContainer } from './container'
import { SidebarHeader } from './header'
import { SidebarHelpCard } from './help-card'
import { DashboardSidebarMenuSection } from './menu-section'

export async function DashboardSidebar() {
  const user = await getProfile()

  return (
    <DashboardSidebarContainer>
      <SidebarHeader />

      <Divider />

      <DashboardSidebarMenuSection sections={SIDEBAR_SECTIONS} />

      <SidebarHelpCard />

      <SidebarAccount user={user!} />
    </DashboardSidebarContainer>
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
