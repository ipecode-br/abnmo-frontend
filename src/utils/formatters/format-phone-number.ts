import { NON_NUMBER_REGEX } from '@/constants/regex'

/**
 * Formats a Brazilian phone number into a readable pattern.
 *
 * Rules:
 * - All non-numeric characters are removed before formatting.
 * - If the number has up to 10 digits → `(00) 0000-0000`
 * - If the number has 11 digits → `(00) 00000-0000`
 * - Input is automatically truncated to the maximum valid length (11 digits).
 *
 * @param input - The raw phone number string (may contain non-numeric characters).
 *
 * @returns The formatted phone number string.
 *
 * @example
 * formatPhoneNumber('11987654321')
 * // '(11) 98765-4321'
 *
 * @example
 * formatPhoneNumber('1132654321')
 * // '(11) 3265-4321'
 *
 * @example
 * formatPhoneNumber('(11) 98765-4321')
 * // '(11) 98765-4321'
 *
 * @example
 * formatPhoneNumber('11abc987654321999')
 * // '(11) 98765-4321'
 */
export function formatPhoneNumber(input: string) {
  const sanitizedInput = input.replace(NON_NUMBER_REGEX, '')

  return sanitizedInput.length <= 10
    ? sanitizedInput
        // Add () and space after the 2nd number
        .replace(/(\d{2})(\d)/, '($1) $2')
        // Add a dash after the next 6th number
        .replace(/(\d{4})(\d)/, '$1-$2')
    : sanitizedInput
        // Add () and space after the 2nd number
        .replace(/(\d{2})(\d)/, '($1) $2')
        // Add a dash after the next 7th number
        .replace(/(\d{5})(\d)/, '$1-$2')
        // Limit to 11 numbers
        .replace(/(\(\d{2}\) \d{5}-\d{4}).+/, '$1')
}
