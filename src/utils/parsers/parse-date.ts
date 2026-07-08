import { validateDate } from '../validators/validate-date'

/**
 * Parses a valid DD/MM/YYYY string into a JS Date.
 * Returns null for invalid or incomplete strings.
 */
export function parseDate(value: string) {
  if (!validateDate(value)) return

  const [day, month, year] = value.split('/').map(Number)

  return new Date(year, month - 1, day)
}
