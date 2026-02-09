import type { Metadata } from 'next'

import { UserInvitesList } from '@/modules/users/invites/list'

export const metadata: Metadata = {
  title: 'Convites',
}

export default function Page() {
  return <UserInvitesList />
}
