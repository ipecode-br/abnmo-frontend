import type { Metadata } from 'next'

import { UsersList } from '@/modules/users/list'

export const metadata: Metadata = {
  title: 'Equipe',
}

export default function Page() {
  return <UsersList />
}
