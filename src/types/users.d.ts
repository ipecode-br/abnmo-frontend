import type { Specialty } from '@/enums/shared'
import type { UserRole, UserStatus } from '@/enums/users'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  role: UserRole
  features: string[]
  status: UserStatus
  specialty: Specialty | null
  registrationId: string | null
  updatedAt: string
  createdAt: string
}

export type UserInvite = {
  id: string
  email: string
  expiresAt: string
  createdAt: string
}
