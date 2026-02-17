'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ClipboardPenIcon } from 'lucide-react'
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
    registration_id: userRegistrationId.nullable().optional(),
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
      if (data.role === 'specialist') return data.registration_id
      return true
    },
    {
      message: 'Registro profissional é obrigatório',
      path: ['registration_id'],
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
  const formMethods = useForm<UpdateUserFormSchema>({
    resolver: zodResolver(updateUserFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      specialty: user.specialty || null,
      registration_id: user.registration_id || null,
    },
  })

  const isSpecialist = user.role === 'specialist'

  async function submitForm({
    name,
    specialty,
    registration_id,
  }: UpdateUserFormSchema) {
    const response = await api(`/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        specialty: isSpecialist ? specialty : null,
        registration_id: isSpecialist ? registration_id : null,
      }),
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
            className='gap-4'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <TextInput
              name='name'
              label='Nome completo'
              placeholder='Insira o nome'
              isRequired
            />

            <TextInput name='email' label='E-mail' readOnly />

            <SelectInput
              name='role'
              label='Função'
              options={USERS_ROLE_OPTIONS}
              readOnly
            />

            {isSpecialist && (
              <>
                <SelectInput
                  name='specialty'
                  label='Especialidade'
                  options={SPECIALTIES_OPTIONS}
                  placeholder='Selecione a especialidade'
                  isRequired
                />

                <TextInput
                  name='registration_id'
                  label='Registro profissional'
                  maxLength={32}
                  placeholder='Insira o número do registro'
                  isRequired
                />
              </>
            )}
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Confirmar
        </Button>
        <DialogClose
          className='flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
