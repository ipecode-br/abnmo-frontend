'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
import { useId } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormContainer } from '@/components/form/form-container'
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
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'
import { kinshipSchema, nameSchema, phoneSchema } from '@/schemas'
import type { SupportContact } from '@/types/patients'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'
import { removeNonNumbers } from '@/utils/sanitizers'

const patientSupportFormSchema = z.object({
  name: nameSchema,
  kinship: kinshipSchema,
  phone: phoneSchema,
})
type PatientSupportFormSchema = z.infer<typeof patientSupportFormSchema>

type PatientSupportModalMode = 'create' | 'edit'

interface PatientSupportModalProps {
  mode: PatientSupportModalMode
  onClose: () => void
  patientId?: string
  patientSupport?: SupportContact
}

export function PatientSupportModal({
  mode,
  patientId,
  patientSupport,
  onClose,
}: Readonly<PatientSupportModalProps>) {
  const formId = useId()

  const formMethods = useForm<PatientSupportFormSchema>({
    resolver: zodResolver(patientSupportFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: patientSupport?.name || '',
      kinship: patientSupport?.kinship || '',
      phone: patientSupport?.phone
        ? formatPhoneNumber(patientSupport?.phone)
        : '',
    },
  })

  async function submitForm({
    name,
    kinship,
    phone,
  }: PatientSupportFormSchema) {
    const body = {
      name,
      kinship,
      phone: removeNonNumbers(phone),
    }

    const response =
      mode === 'create'
        ? await api(`/patient-supports/${patientId}`, { method: 'POST', body })
        : await api(`/patient-supports/${patientId}`, {
            method: 'PUT',
            body,
          })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateServerCache(NEXT_CACHE_TAGS.patient(patientId!))
    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-sm'>
      <DialogHeader icon={<DialogIcon icon={EditIcon} />}>
        <DialogTitle>Editar contato de apoio</DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            id={formId}
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <LabelWrapper>
              <Label isRequired>Nome completo</Label>
              <TextInput
                name='name'
                maxLength={64}
                placeholder='Insira o nome completo'
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Parentesco</Label>
              <TextInput
                name='kinship'
                maxLength={32}
                placeholder='Insira o parentesco'
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Telefone (WhatsApp)</Label>
              <TextInput
                name='phone'
                mask='phone'
                maxLength={15}
                placeholder='(00) 00000-0000'
              />
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
          Atualizar contato
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
