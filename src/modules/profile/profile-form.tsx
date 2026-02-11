'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Divider } from '@/components/ui/divider'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { USERS_ROLE_OPTIONS } from '@/enums/users'
import {
  emailSchema,
  nameSchema,
  specialtySchema,
  userRoleSchema,
} from '@/schemas'
import type { User } from '@/types/users'

export const userProfileFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  role: userRoleSchema,
  specialty: specialtySchema.nullable(),
  registration_id: z.string().max(32).nullable(),
})
export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>

interface UserProfileFormProps {
  user: User
}

export function UserProfileForm({ user }: Readonly<UserProfileFormProps>) {
  const formMethods = useForm<UserProfileFormSchema>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty || '',
      registration_id: user.registration_id || '',
    } as UserProfileFormSchema,
    mode: 'onBlur',
  })

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        <div className='grid gap-4 lg:grid-cols-3'>
          <TextInput name='name' label='Nome completo' readOnly />
          <TextInput name='email' label='E-mail' readOnly />
          <SelectInput
            name='role'
            label='Cargo'
            options={USERS_ROLE_OPTIONS}
            readOnly
          />
        </div>

        {user.role === 'specialist' && (
          <>
            <Divider />
            <div className='grid gap-4 md:grid-cols-2'>
              <SelectInput
                name='specialty'
                label='Especialidade'
                options={SPECIALTIES_OPTIONS}
                readOnly
              />
              <TextInput
                name='registration_id'
                label='Registro profissional'
                readOnly
              />
            </div>
          </>
        )}
      </FormContainer>
    </FormProvider>
  )
}
