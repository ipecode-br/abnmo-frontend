import { NON_NUMBER_REGEX } from '@/constants/regex'

export function validateCPF(value: string): boolean {
  value = value.replace(NON_NUMBER_REGEX, '')

  if (value.length !== 11) return false

  // Reject CPFs with all repeated digits (e.g. 111.111.111-11)
  if (/^(\d)\1{10}$/.test(value)) return false

  // Validate the 1st check digit
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number(value[i]) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number(value[9])) return false

  // Validate the 2nd check digit
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number(value[i]) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== Number(value[10])) return false

  return true
}
