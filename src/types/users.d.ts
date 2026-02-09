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
  registration_number: string | null
  updated_at: Date
  created_at: Date
}
