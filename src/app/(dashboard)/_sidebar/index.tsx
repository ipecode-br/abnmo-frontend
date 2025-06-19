import {
  Bolt,
  Headset,
  LayoutDashboard,
  Share2,
  UserRoundCheck,
  UserRoundSearch,
} from 'lucide-react'

import { Header } from './sidebar-header'
import { HelpCard } from './sidebar-help-card'
import { NavLink } from './sidebar-nav-link'
import { NavSection } from './sidebar-nav-section'
import { UserInfo } from './sidebar-user-info'

export function DashboardSidebar() {
  return (
    <aside className='border-border flex h-screen w-[274px] flex-col border-r px-6 py-8'>
      <div className='flex flex-1 flex-col gap-8 overflow-y-auto'>
        <Header name={'Cleide Systems'} />

        <NavSection title='GERAL'>
          <NavLink href='#' icon={LayoutDashboard}>
            Visão Geral
          </NavLink>
          <NavLink href='/pacientes' icon={UserRoundSearch}>
            Pacientes
          </NavLink>
          <NavLink href='/encaminhados' icon={Share2}>
            Encaminhamentos
          </NavLink>
          <NavLink href='#' icon={UserRoundCheck}>
            Aprovação
          </NavLink>
        </NavSection>

        <NavSection title='OUTROS'>
          <NavLink href='#' icon={Bolt}>
            Configurações
          </NavLink>
          <NavLink href='#' icon={Headset}>
            Suporte
          </NavLink>
        </NavSection>

        <HelpCard />
      </div>

      <UserInfo name={'Claudio Oliveira'} role={'Enfermagem'} />
    </aside>
  )
}
