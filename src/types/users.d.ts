import type { Specialty } from '@/enums/shared'
import type { UserRole, UserStatus } from '@/enums/users'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
  avatar_url: string | null
  status: UserStatus
  specialty: Specialty | null
  registration_id: string | null
  updated_at: string
  created_at: string
}

export type UserInvite = {
  id: string
  email: string
  expires_at: string
  created_at: string
}
