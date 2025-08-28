import { NON_NUMBER_REGEX } from '@/constants/regex'

/**
 * Formats a string input to DD/MM/YYYY format
 * @returns Formatted date string in DD/MM/YYYY format
 */
export function formatDateInput(input: string): string {
  const sanitizedInput = input.replace(NON_NUMBER_REGEX, '').slice(0, 8)

  return (
    sanitizedInput
      // Add / after 2 digits (DD/)
      .replace(/^(\d{2})(\d)/, '$1/$2')
      // Add / after 4 digits (DD/MM/)
      .replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
  )
}

/**
 * Parses a DD/MM/YYYY formatted string to a Date object
 * @param dateString - The date string in DD/MM/YYYY format
 * @returns Date object or null if invalid
 */
export function parseDateInput(dateString: string): Date | null {
  if (!dateString || dateString.length !== 10) return null

  const [day, month, year] = dateString.split('/').map(Number)

  if (!day || !month || !year || day > 31 || month > 12 || year < 1900) {
    return null
  }

  const date = new Date(year, month - 1, day)

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}
