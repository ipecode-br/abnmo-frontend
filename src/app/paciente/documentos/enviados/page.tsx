import type { Metadata } from 'next'

import { SentTable } from './table'

export const metadata: Metadata = {
  title: 'Enviados',
}

export default function Page() {
  return <SentTable />
}
