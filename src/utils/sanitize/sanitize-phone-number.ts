import { NON_NUMBER_REGEX } from '@/constants/regex'

export function sanitizePhone(value: string) {
  return value.replace(NON_NUMBER_REGEX, '')
}
