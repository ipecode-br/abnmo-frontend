import { PASSWORD_MIN_LENGTH } from '@/constants/auth'
import {
  LOWERCASE_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHAR_REGEX,
  UPPERCASE_REGEX,
} from '@/constants/regex'

type PasswordRequirementType = {
  type: (typeof PASSWORD_REQUIREMENTS)[keyof typeof PASSWORD_REQUIREMENTS]
  text: string
  isValid: boolean
}

export const PASSWORD_REQUIREMENTS = {
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  number: 'number',
  specialChar: 'special_char',
  length: 'length',
} as const

export function getPasswordRequirements(
  value: string,
): PasswordRequirementType[] {
  const { uppercase, lowercase, number, specialChar, length } =
    PASSWORD_REQUIREMENTS

  return [
    {
      type: uppercase,
      text: 'Pelo menos 1 letra maiúscula',
      isValid: UPPERCASE_REGEX.test(value),
    },
    {
      type: lowercase,
      text: 'Pelo menos 1 letra minúscula',
      isValid: LOWERCASE_REGEX.test(value),
    },
    {
      type: number,
      text: 'Pelo menos 1 número',
      isValid: NUMBER_REGEX.test(value),
    },
    {
      type: specialChar,
      text: 'Pelo menos 1 caractere especial',
      isValid: SPECIAL_CHAR_REGEX.test(value),
    },
    {
      type: length,
      text: `Pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
      isValid: value.length >= PASSWORD_MIN_LENGTH,
    },
  ]
}
