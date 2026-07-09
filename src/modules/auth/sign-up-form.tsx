'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { CheckboxInput } from '@/components/form/checkbox-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { PasswordInput } from '@/components/form/password-input'
import { SelectInput } from '@/components/form-v2/select-input'
import { TextInput } from '@/components/form-v2/text-input'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { Label, LabelWrapper } from '@/components/ui-v2/label'
import { ROUTES } from '@/constants/routes'
import { SPECIALTIES_OPTIONS, type Specialty } from '@/enums/shared'
import { type UserRole, USERS_ROLE_ENUM } from '@/enums/users'
import { api } from '@/lib/api'
import {
  nameSchema,
  passwordSchema,
  specialtySchema,
  userRegistrationId,
} from '@/schemas'

export const signUpFormSchema = z
  .object({
    role: z.enum(USERS_ROLE_ENUM),
    name: nameSchema,
    specialty: z.union([specialtySchema, z.literal('')]),
    registrationId: userRegistrationId.optional(),
    password: passwordSchema,
    confirmPassword: z.string(),
    consent: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
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
      if (!data.registrationId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['registrationId'],
          message: 'Registro profissional é obrigatório',
        })
      }
    }
  })
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

type RegisterUserBody = {
  role: UserRole
  name: string
  password: string
  inviteToken: string
  specialty?: Specialty
  registrationId?: string
}

interface SignUpFormProps {
  token: string
  role: UserRole
}

export function SignUpForm({
  role,
  token: inviteToken,
}: Readonly<SignUpFormProps>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const formMethods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      role,
      name: '',
      specialty: '',
      registrationId: '',
      password: '',
      confirmPassword: '',
      consent: false,
    } as unknown as SignUpFormSchema,
  })

  async function registerUser({
    role,
    name,
    password,
    specialty,
    registrationId,
  }: SignUpFormSchema) {
    startTransition(async () => {
      const body: RegisterUserBody = { role, name, password, inviteToken }

      if (specialty && registrationId) {
        body.specialty = specialty
        body.registrationId = registrationId
      }

      const response = await api('/register/user', { method: 'POST', body })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)
      router.push(ROUTES.dashboard.main)
    })
  }

  // TODO: add link to policies

  return (
    <FormProvider {...formMethods}>
      <FormContainer onSubmit={formMethods.handleSubmit(registerUser)}>
        <FormField>
          <LabelWrapper>
            <Label isRequired>Nome completo</Label>
            <TextInput name='name' placeholder='Insira seu nome completo' />
          </LabelWrapper>

          {role === 'specialist' && (
            <>
              <LabelWrapper>
                <Label isRequired>Especialidade</Label>
                <SelectInput name='specialty' options={SPECIALTIES_OPTIONS} />
              </LabelWrapper>
              <LabelWrapper>
                <Label isRequired>Registro profissional</Label>
                <TextInput
                  name='registrationId'
                  placeholder='Insira seu registro profissional'
                />
              </LabelWrapper>
            </>
          )}

          <LabelWrapper>
            <Label isRequired>Senha</Label>
            <PasswordInput
              name='password'
              showRequirements
              placeholder='Digite sua senha'
            />
          </LabelWrapper>
          <LabelWrapper>
            <Label isRequired>Confirmar senha</Label>
            <PasswordInput
              name='confirmPassword'
              placeholder='Repita sua senha'
            />
          </LabelWrapper>
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

        <Button type='submit' loading={isPending}>
          Cadastrar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
