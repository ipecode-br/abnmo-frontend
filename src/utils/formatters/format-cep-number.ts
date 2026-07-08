import { NON_NUMBER_REGEX } from '@/constants/regex'

/**
 * Formats a CEP number into the standard Brazilian pattern: `00000-000`.
 *
 * All non-numeric characters are removed before formatting.
 * The value is limited to 8 digits.
 *
 * @param value - The raw CEP string (may contain non-numeric characters).
 *
 * @returns The formatted CEP string.
 *
 * @example
 * formatCepNumber('12345678')
 * // '12345-678'
 *
 * @example
 * formatCepNumber('12345-678')
 * // '12345-678'
 *
 * @example
 * formatCepNumber('12345abc678xyz')
 * // '12345-678'
 */
export function formatCepNumber(value: string) {
  const sanitized = value.replace(NON_NUMBER_REGEX, '').slice(0, 8)

  return (
    sanitized
      // Add dash after 5 digits (00000-)
      .replace(/^(\d{5})(\d)/, '$1-$2')
  )
}
