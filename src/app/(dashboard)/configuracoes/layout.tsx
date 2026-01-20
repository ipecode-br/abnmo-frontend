import { SettingsSidebar } from '@/modules/settings/layout'

import { SettingsContent } from '../../../modules/settings/layout/settings-content'

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex min-h-svh'>
      <SettingsSidebar />
      <SettingsContent>{children}</SettingsContent>
    </div>
  )
}
