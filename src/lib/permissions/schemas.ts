import { z } from 'zod'

export const roleSchema = z.union([
  z.literal('admin'),
  z.literal('nurse'),
  z.literal('specialist'),
  z.literal('manager'),
  z.literal('patient'),
])
export type Role = z.infer<typeof roleSchema>

export const actionSchema = z.union([
  z.literal('manage'),
  z.literal('view'),
  z.literal('create'),
  z.literal('update'),
  z.literal('delete'),
])
export type Action = z.infer<typeof actionSchema>

export const subjectSchema = z.union([
  z.literal('all'),
  z.literal('Dashboard'),
  z.literal('PatientDashboard'),
  z.literal('Patients'),
  z.literal('Appointments'),
  z.literal('Statistics'),
  z.literal('Users'),
])
export type Subject = z.infer<typeof subjectSchema>
