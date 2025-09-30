import type { Metadata } from 'next'

import { ScreeningSupportNetworkForm } from './support-network-form'

export const metadata: Metadata = {
  title: 'Rede de apoio',
}

export default function Page() {
  return <ScreeningSupportNetworkForm />
}
