import { NON_NUMBER_REGEX } from '@/constants/regex'

export function sanitizeCpf(value: string) {
  return value.replace(NON_NUMBER_REGEX, '')
}
