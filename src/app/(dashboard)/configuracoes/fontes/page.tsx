import type { Metadata } from 'next'

import { SettingsContainer } from '@/modules/settings/layout/settings-container'

import { FontSizeCards } from '../../../../modules/settings/cards/fontsize/fontsize-cards'

export const metadata: Metadata = {
  title: 'Tamanho da fonte',
}

export default function Page() {
  return (
    <SettingsContainer className='flex flex-col gap-6'>
      <FontSizeCards />
    </SettingsContainer>
  )
}
