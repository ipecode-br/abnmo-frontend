import type { Metadata } from 'next'

import { FontSizeCards } from '@/modules/settings/cards/fontsize/fontsize-cards'

export const metadata: Metadata = {
  title: 'Tamanho da fonte',
}

export default function Page() {
  return <FontSizeCards />
}
