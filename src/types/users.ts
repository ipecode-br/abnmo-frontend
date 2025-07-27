export type UserType = {
  id: string
  name: string
  email: string
  role: 'admin' | 'nurse' | 'specialist' | 'manager' | 'patient'
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}
