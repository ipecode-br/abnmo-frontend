import type { Metadata } from 'next'

import { NotificationPreferences } from '@/modules/settings/cards/notifications/notifications-cards'
import { SettingsContainer } from '@/modules/settings/layout/settings-container'

export const metadata: Metadata = {
  title: 'Configurações',
}

export default function Page() {
  return (
    <SettingsContainer>
      <NotificationPreferences />
    </SettingsContainer>
  )
}
