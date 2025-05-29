import { z } from 'zod'

import {
  NAME_REGEX,
  NON_SPECIAL_CHAR_REGEX,
  PHONE_REGEX,
} from '@/constants/regex'

export const screeningSupportNetworkFormSchema = z.object({
  fullName: z
    .string()
    .min(1, 'Insira o nome completo')
    .min(3, 'O nome deve conter mais de 3 caracteres')
    .regex(NAME_REGEX, 'Insira o nome e sobrenome completo')
    .regex(
      NON_SPECIAL_CHAR_REGEX,
      'Números e caracteres especiais são inválidos',
    ),
  kinship: z
    .string()
    .min(1, 'Insira o parentesco')
    .min(3, 'O parentesco deve conter mais de 3 caracteres')
    .regex(
      NON_SPECIAL_CHAR_REGEX,
      'Números e caracteres especiais são inválidos',
    ),
  phone: z
    .string()
    .nonempty('Insira o seu telefone')
    .regex(PHONE_REGEX, 'Insira um número de telefone válido'),
  id: z.string(),
})

export type ScreeningSupportNetworkFormSchema = z.infer<
  typeof screeningSupportNetworkFormSchema
>

export const screeningSupportNetworkFormDefaultValues: ScreeningSupportNetworkFormSchema =
  {
    fullName: '',
    kinship: '',
    phone: '',
    id: '',
  }

export const screeningSupportNetworkContactsSchema = z.object({
  contacts: z.array(screeningSupportNetworkFormSchema),
})

export type ScreeningSupportNetworkContactsSchema = z.infer<
  typeof screeningSupportNetworkContactsSchema
>
