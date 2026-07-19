import { ALargeSmall, BellDot } from 'lucide-react'

import { ROUTES } from '@/constants/routes'

import { SettingsMenuSection } from './settings-menu-section'
import { SettingsSidebarContainer } from './settings-sidebar-container'

export function SettingsSidebar() {
  return (
    <SettingsSidebarContainer>
      <SettingsMenuSection sections={SETTINGS_SIDEBAR_SECTIONS} />
    </SettingsSidebarContainer>
  )
}

const SETTINGS_SIDEBAR_SECTIONS = [
  {
    id: 'common',
    links: [
      {
        label: 'Notificações',
        icon: <BellDot />,
        path: ROUTES.settings.main,
      },
      {
        label: 'Tamanho da fonte',
        icon: <ALargeSmall />,
        path: ROUTES.settings.fontSize,
      },
    ],
  },
]
