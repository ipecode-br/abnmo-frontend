import type { Metadata } from 'next'

import Overview from './visao/page'

export const metadata: Metadata = {
  title: 'Visão Geral',
}

export default function VisaoPage() {
  return <Overview />
}
