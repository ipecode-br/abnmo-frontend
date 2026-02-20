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
      action: ['view', 'create', 'update', 'delete'],
      subject: ['Patients'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['Appointments'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['Referrals'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['PatientSupports'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['Users', 'Invites'],
    },
    {
      action: 'view',
      subject: ['Dashboard', 'Statistics'],
    },
  ],

  nurse: [
    {
      action: ['view', 'create', 'update'],
      subject: ['Patients'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['Appointments'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['Referrals'],
    },
    {
      action: ['view', 'create', 'update', 'delete'],
      subject: ['PatientSupports'],
    },
    {
      action: 'view',
      subject: ['Dashboard', 'Statistics'],
    },
  ],

  specialist: [
    {
      action: ['view'],
      subject: ['Patients'],
    },
    {
      action: ['view', 'create', 'update'],
      subject: ['Appointments'],
    },
    {
      action: ['view', 'update'],
      subject: ['Referrals'],
    },
    {
      action: 'view',
      subject: ['Dashboard', 'Statistics'],
    },
  ],

  patient: [
    {
      action: 'view',
      subject: ['PatientDashboard'],
    },
    {
      action: ['view', 'update'],
      subject: ['Appointments'],
    },
    {
      action: ['view'],
      subject: ['Referrals'],
    },
    {
      action: ['create', 'update', 'delete'],
      subject: ['PatientSupports'],
    },
  ],
}
