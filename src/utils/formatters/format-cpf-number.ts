import { NON_NUMBER_REGEX } from '@/constants/regex'

export function formatCpfNumber(input: string) {
  const sanitizedInput = input.replace(NON_NUMBER_REGEX, '').slice(0, 11)

  return (
    sanitizedInput
      // Add . after 3 digits (000.)
      .replace(/^(\d{3})(\d)/, '$1.$2')
      // Add . after 6 digits (000.000.)
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      // Add dash after 9 digits (000.000.000-)
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  )
}
