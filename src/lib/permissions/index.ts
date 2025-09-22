import { permissions } from './permissions'
import type { Action, Role, Subject } from './schemas'

export function definePermissionsFor(role: Role) {
  const rolePermissions = permissions[role] ?? []

  function can(action: Action, subject: Subject): boolean {
    return rolePermissions.some((permission) => {
      const actions = Array.isArray(permission.action)
        ? permission.action
        : [permission.action]
      const subjects = Array.isArray(permission.subject)
        ? permission.subject
        : [permission.subject]

      const matchesAction =
        actions.includes(action) || actions.includes('manage')
      const matchesSubject =
        subjects.includes(subject) || subjects.includes('all')

      return matchesAction && matchesSubject
    })
  }

  return { can }
}
