'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardPenIcon } from 'lucide-react'
import { useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label, LabelWrapper } from '@/components/ui/label'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { USERS_ROLE_OPTIONS } from '@/enums/users'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { api } from '@/lib/api'
import {
  emailSchema,
  nameSchema,
  specialtySchema,
  userRegistrationId,
  userRoleSchema,
} from '@/schemas'
import type { User } from '@/types/users'

const updateUserFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    role: userRoleSchema,
    specialty: specialtySchema.nullable().optional(),
    registrationId: userRegistrationId.nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.role === 'specialist') return data.specialty
      return true
    },
    {
      message: 'Especialidade é obrigatória',
      path: ['specialty'],
    },
  )
  .refine(
    (data) => {
      if (data.role === 'specialist') return data.registrationId
      return true
    },
    {
      message: 'Registro profissional é obrigatório',
      path: ['registrationId'],
    },
  )

type UpdateUserFormSchema = z.infer<typeof updateUserFormSchema>

interface UpdateUserModalProps {
  user: User
  onClose: () => void
}

export function UpdateUserModal({
  user,
  onClose,
}: Readonly<UpdateUserModalProps>) {
  const formId = useId()
  const formMethods = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty || null,
      registrationId: user.registrationId || null,
    },
  })

  const isSpecialist = user.role === 'specialist'

  async function submitForm({
    name,
    specialty,
    registrationId,
  }: UpdateUserFormSchema) {
    const response = await api(`/users/${user.id}`, {
      method: 'PUT',
      body: {
        name: name,
        specialty: isSpecialist ? specialty : null,
        registrationId: isSpecialist ? registrationId : null,
      },
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateClientCache(QUERY_CACHE_KEYS.users.main)

    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-md'>
      <DialogHeader icon={<DialogIcon icon={ClipboardPenIcon} />}>
        <DialogTitle>Editar usuário</DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            id={formId}
            className='gap-4'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <LabelWrapper>
              <Label isRequired>Nome completo</Label>
              <TextInput name='name' placeholder='Insira o nome' />
            </LabelWrapper>

            <LabelWrapper>
              <Label isRequired>E-mail</Label>
              <TextInput name='email' readOnly />
            </LabelWrapper>

            <LabelWrapper>
              <Label isRequired>Função</Label>
              <SelectInput name='role' options={USERS_ROLE_OPTIONS} readOnly />
            </LabelWrapper>

            {isSpecialist && (
              <>
                <LabelWrapper>
                  <Label isRequired>Especialidade</Label>
                  <SelectInput name='specialty' options={SPECIALTIES_OPTIONS} />
                </LabelWrapper>

                <LabelWrapper>
                  <Label isRequired>Registro profissional</Label>
                  <TextInput
                    name='registrationId'
                    maxLength={32}
                    placeholder='Insira o número do registro'
                  />
                </LabelWrapper>
              </>
            )}
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          form={formId}
          className='md:flex-1'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Confirmar
        </Button>
        <DialogClose
          className='md:flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
