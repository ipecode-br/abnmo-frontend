'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'
import { SPECIALTIES_OPTIONS, type Specialty } from '@/enums/shared'
import { type UserRole, USERS_ROLE_ENUM } from '@/enums/users'
import { api } from '@/lib/api'
import { nameSchema, passwordSchema, specialtySchema } from '@/schemas'

export const signUpFormSchema = z
  .object({
    role: z.enum(USERS_ROLE_ENUM),
    name: nameSchema,
    specialty: z.union([specialtySchema, z.literal('')]),
    registration_id: z.string().max(32).optional(),
    password: passwordSchema,
    confirm_password: z.string(),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirm_password'],
        message: 'Suas senhas não coincidem',
      })
    }
    if (!data.consent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['consent'],
        message: 'Seu consentimento é obrigatório',
      })
    }
    if (data.role === 'specialist') {
      if (!data.specialty) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['specialty'],
          message: 'Especialidade é obrigatória',
        })
      }
      if (!data.registration_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['registration_id'],
          message: 'Registro profissional é obrigatório',
        })
      }
    }
  })
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

type RegisterUserPayload = {
  role: UserRole
  name: string
  password: string
  invite_token: string
  specialty?: Specialty
  registration_id?: string
}

interface SignUpFormProps {
  token: string
  role: UserRole
}

export function SignUpForm({ token, role }: Readonly<SignUpFormProps>) {
  const router = useRouter()
  const formMethods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      role,
      name: '',
      specialty: '',
      registration_id: '',
      password: '',
      confirm_password: '',
      consent: false,
    } as unknown as SignUpFormSchema,
  })

  async function registerUser({
    role,
    name,
    password,
    specialty,
    registration_id,
  }: SignUpFormSchema) {
    const payload: RegisterUserPayload = {
      role,
      name,
      password,
      invite_token: token,
    }

    if (specialty && registration_id) {
      payload.specialty = specialty
      payload.registration_id = registration_id
    }

    const response = await api('/register/user', {
      method: 'POST',
      body: JSON.stringify(payload),
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    toast.success(response.message)
    router.push(ROUTES.dashboard.main)
  }

  // TODO: add link to policies

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(registerUser)}>
        <FormField>
          <TextInput
            name='name'
            label='Nome completo'
            icon={User2Icon}
            placeholder='Insira seu nome completo'
            isRequired
          />

          {role === 'specialist' && (
            <>
              <SelectInput
                name='specialty'
                label='Especialidade'
                options={SPECIALTIES_OPTIONS}
                isRequired
              />
              <TextInput
                name='registration_id'
                label='Registro profissional'
                placeholder='Insira seu registro profissional'
                isRequired
              />
            </>
          )}
          <PasswordInput
            name='password'
            label='Senha'
            placeholder='Digite sua senha'
            showRequirements
            isRequired
          />
          <PasswordInput
            name='confirm_password'
            label='Confirmar senha'
            placeholder='Repita sua senha'
            isRequired
          />
        </FormField>

        <CheckboxInput
          name='consent'
          label={
            <span className='text-xs'>
              Li e concordo com os <NavLink href='#'>Termos de Uso</NavLink> e{' '}
              <NavLink href='#'>Política de Privacidade</NavLink>
            </span>
          }
        />

        <Button type='submit' loading={formMethods.formState.isSubmitting}>
          Cadastrar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
