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
