import { NON_NUMBER_REGEX } from '@/constants/regex'

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
