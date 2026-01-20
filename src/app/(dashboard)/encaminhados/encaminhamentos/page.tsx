import type { Metadata } from 'next'

import { ReferralsTable } from './referrals-table'

export const metadata: Metadata = {
  title: 'Encaminhamentos',
}

export default function Page() {
  return <ReferralsTable />
}
