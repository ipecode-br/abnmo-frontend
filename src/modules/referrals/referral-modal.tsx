'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SmilePlusIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { ComboboxInput } from '@/components/form/combobox-input'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { TextareaInput } from '@/components/form/textarea-input'
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
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { PATIENT_CONDITION_OPTIONS } from '@/enums/patients'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { usePatientOptions } from '@/hooks/use-patient-otions'
import { api } from '@/lib/api'
import {
  dateSchema,
  patientConditionSchema,
  professionalNameSchema,
  specialtySchema,
} from '@/schemas'
import type { Referral } from '@/types/referrals'

const referralFormSchema = z.object({
  patient_id: z.string().uuid('Paciente é obrigatório'),
  date: dateSchema,
  category: specialtySchema,
  condition: patientConditionSchema,
  annotation: z
    .string()
    .max(2000)
    .nullable()
    .transform((value) => (!value ? null : value)),
  professional_name: professionalNameSchema,
})
type ReferralFormSchema = z.infer<typeof referralFormSchema>

interface ReferralModalProps {
  patientId?: string
  referral?: Referral
  onClose: () => void
}

export function ReferralModal({
  patientId,
  referral,
  onClose,
}: ReferralModalProps) {
  const { patientOptions } = usePatientOptions()

  const isEditMode = !!referral

  const formMethods = useForm<ReferralFormSchema>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      patient_id: patientId ?? (referral?.patient_id || ''),
      date: referral?.date || '',
      category: referral?.category || '',
      condition: referral?.condition || '',
      annotation: referral?.annotation || '',
      professional_name: referral?.professional_name || '',
    } as unknown as ReferralFormSchema,
    mode: 'onBlur',
  })

  function createReferral(data: ReferralFormSchema) {
    return api('/referrals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  function updateReferral({ date, condition, annotation }: ReferralFormSchema) {
    return api(`/referrals/${referral?.id}`, {
      method: 'PUT',
      body: JSON.stringify({ date, condition, annotation }),
    })
  }

  async function submitForm(data: ReferralFormSchema) {
    const response = isEditMode
      ? await updateReferral(data)
      : await createReferral(data)

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateClientCache([
      QUERY_CACHE_KEYS.referrals.main,
      QUERY_CACHE_KEYS.statistics.totalReferralsByCategory,
      QUERY_CACHE_KEYS.statistics.totalReferralsByState,
      QUERY_CACHE_KEYS.statistics.totalReferrals,
    ])
    revalidateServerCache([
      NEXT_CACHE_TAGS.patient(data.patient_id),
      NEXT_CACHE_TAGS.referrals.main,
      NEXT_CACHE_TAGS.statistics.totalReferrals.main,
      NEXT_CACHE_TAGS.statistics.totalPatientsWithReferrals.main,
    ])

    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-xl'>
      <DialogHeader icon={<DialogIcon icon={SmilePlusIcon} />}>
        <DialogTitle>
          {isEditMode ? 'Atualizar encaminhamento' : 'Encaminhar paciente'}
        </DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            className='grid gap-4 sm:grid-cols-2'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <ComboboxInput
              name='patient_id'
              label='Paciente'
              options={patientOptions}
              className='sm:col-span-full'
              placeholder='Selecione um paciente'
              readOnly={isEditMode || !!patientId}
              isRequired
            />
            <DateInput
              name='date'
              label='Data do encaminhamento'
              wrapperClassName='sm:col-span-1'
              allowFutureDates
              isRequired
            />
            <SelectInput
              name='category'
              label='Categoria'
              options={SPECIALTIES_OPTIONS}
              className='sm:col-span-1'
              readOnly={isEditMode}
              isRequired
            />
            <SelectInput
              name='condition'
              label='Quadro geral'
              options={PATIENT_CONDITION_OPTIONS}
              className='sm:col-span-1'
              isRequired
            />
            <TextInput
              name='professional_name'
              label='Profissional responsável'
              wrapperClassName='sm:col-span-1'
              readOnly={isEditMode}
            />
            <TextareaInput
              rows={8}
              maxLength={2000}
              name='annotation'
              label='Observações'
              placeholder='Insira observações sobre o paciente'
              wrapperClassName='sm:col-span-full'
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
          {isEditMode ? 'Atualizar' : 'Cadastrar'}
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
