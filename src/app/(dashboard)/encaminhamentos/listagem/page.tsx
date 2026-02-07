import type { Metadata } from 'next'

import { ReferralsList } from '@/modules/referrals/list'

export const metadata: Metadata = {
  title: 'Encaminhamentos',
}

export default function Page() {
  return <ReferralsList />
}
