'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MailPlusIcon } from 'lucide-react'
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
import { USERS_ROLE_ENUM, USERS_ROLE_OPTIONS } from '@/enums/users'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { api } from '@/lib/api'

const userInviteFormSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  role: z.enum(USERS_ROLE_ENUM, { message: 'Selecione um cargo' }),
})
type UserInviteFormSchema = z.infer<typeof userInviteFormSchema>

interface NewUserInviteModalProps {
  onClose: () => void
}

export function NewUserInviteModal({ onClose }: NewUserInviteModalProps) {
  const formId = useId()

  const formMethods = useForm<UserInviteFormSchema>({
    resolver: zodResolver(userInviteFormSchema),
    defaultValues: { email: '', role: '' } as unknown as UserInviteFormSchema,
    mode: 'onBlur',
  })

  async function submitForm(body: UserInviteFormSchema) {
    const response = await api('/users/invites', { method: 'POST', body: body })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateClientCache(QUERY_CACHE_KEYS.users.invites)

    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-md'>
      <DialogHeader icon={<DialogIcon icon={MailPlusIcon} />}>
        <DialogTitle>Criar convite</DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            id={formId}
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <LabelWrapper>
              <Label isRequired>E-mail</Label>
              <TextInput name='email' placeholder='Insira o e-mail' />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Cargo</Label>
              <SelectInput name='role' options={USERS_ROLE_OPTIONS} />
            </LabelWrapper>
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
          Enviar
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
