import type { UserRole, UserStatus } from '@/enums/users'

export type User = {
  id: string
  name: string
  email: string
  avatar_url: string | null
  status: UserStatus
  role: UserRole
  updated_at: Date
  created_at: Date
}
