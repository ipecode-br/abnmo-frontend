import type { Action, Role, Subject } from './schemas'

type Permission = {
  action: Action | Action[]
  subject: Subject | Subject[]
}

type RolePermissions = Record<Role, Permission[]>

export const permissions: RolePermissions = {
  admin: [{ action: 'manage', subject: 'all' }],
  manager: [
    {
      action: ['view', 'manage'],
      subject: ['Appointments', 'Dashboard', 'Patients', 'Statistics', 'Users'],
    },
  ],
  nurse: [
    {
      action: ['view', 'manage'],
      subject: ['Appointments', 'Dashboard', 'Patients', 'Statistics'],
    },
  ],
  specialist: [
    {
      action: ['view', 'update'],
      subject: ['Appointments', 'Dashboard', 'Patients'],
    },
  ],
  patient: [
    {
      action: ['view', 'manage'],
      subject: ['Appointments', 'PatientDashboard'],
    },
  ],
}
