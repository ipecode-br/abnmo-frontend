'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { EditIcon } from 'lucide-react'
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
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'
import { kinshipSchema, nameSchema, phoneSchema } from '@/schemas'
import type { PatientSupport } from '@/types/patient-support'
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
  patientSupport?: PatientSupport
}

export function PatientSupportModal({
  mode,
  patientId,
  patientSupport,
  onClose,
}: Readonly<PatientSupportModalProps>) {
  const ensurePatientId = patientId || patientSupport?.patient_id || ''

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
    const body = JSON.stringify({
      name,
      kinship,
      phone: removeNonNumbers(phone),
    })

    const response =
      mode === 'create'
        ? await api(`/patient-supports/${patientId}`, { method: 'POST', body })
        : await api(`/patient-supports/${patientSupport?.id}`, {
            method: 'PUT',
            body,
          })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateServerCache(NEXT_CACHE_TAGS.patient(ensurePatientId))
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
          <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
            <TextInput
              name='name'
              label='Nome completo'
              maxLength={64}
              placeholder='Insira o nome completo'
              isRequired
            />
            <TextInput
              name='kinship'
              label='Parentesco'
              maxLength={32}
              placeholder='Insira o parentesco'
              isRequired
            />
            <TextInput
              name='phone'
              label='Telefone (WhatsApp)'
              mask='phone'
              maxLength={15}
              placeholder='(00) 00000-0000'
              isRequired
            />
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Atualizar contato
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
