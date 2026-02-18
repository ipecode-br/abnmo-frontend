import { z } from 'zod'

import { kinshipSchema, nameSchema, phoneSchema } from '@/schemas'

export const screeningSupportNetworkFormSchema = z.object({
  name: nameSchema,
  kinship: kinshipSchema,
  phone: phoneSchema,
})

export type ScreeningSupportNetworkFormSchema = z.infer<
  typeof screeningSupportNetworkFormSchema
>

export const screeningSupportNetworkContactsSchema = z
  .array(screeningSupportNetworkFormSchema)
  .nullable()

export type ScreeningSupportNetworkContactsSchema = z.infer<
  typeof screeningSupportNetworkContactsSchema
>

export const screeningSupportNetworkFormDefaultValues: ScreeningSupportNetworkFormSchema =
  {
    name: '',
    kinship: '',
    phone: '',
  }
