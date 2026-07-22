import { Feature } from '@/enums/features'
import { User } from '@/types/users'

/**
 * Checks if a user has permission for a feature, optionally scoped by ownership.
 *
 * Admin users bypass all checks. Features ending with `:others` skip ID matching.
 *
 * @param user - The authenticated user with role, features, and ID.
 * @param feature - Single feature or array of features (OR condition).
 * @param compareToId - Target ID(s) for ownership check. Omit to skip.
 *
 * @returns `true` if permitted, `false` otherwise.
 */
export function can(
  user: User,
  feature: Feature | Feature[],
  compareToId?: string | string[],
): boolean {
  if (!user) {
    return false
  }

  if (user.role === 'admin') return true

  if (!user.features) return false

  function matchesId(): boolean {
    if (compareToId === undefined) return true
    const ids = Array.isArray(compareToId) ? compareToId : [compareToId]
    return ids.includes(user.id)
  }

  if (Array.isArray(feature)) {
    const match = feature.some((f) => {
      if (!user.features.includes(f)) return false
      const condition = f.split(':')[2]
      if (condition === 'others') return true
      return matchesId()
    })

    if (!match) return false

    return true
  }

  const hasFeature = user.features.includes(feature)

  if (!hasFeature) return false

  const condition = feature.split(':')[2]

  const canOthers = condition === 'others'
  if (canOthers) return true

  if (!matchesId()) return false

  return true
}
