import { NON_NUMBER_REGEX } from '@/constants/regex'

export function removeNonNumbers(value: string) {
  return value.replace(NON_NUMBER_REGEX, '')
}
