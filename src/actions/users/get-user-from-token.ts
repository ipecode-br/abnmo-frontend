'use server'

import { COOKIES } from '@/constants/cookies'
import type { UserRole } from '@/enums/users'
import { extractTokenData } from '@/helpers/extract-token-data'

export async function getUserFromToken() {
  const user = await extractTokenData<{ sub: string; role: UserRole }>({
    cookie: COOKIES.accessToken,
  })

  if (!user?.sub) return null

  return { id: user.sub, role: user.role }
}
