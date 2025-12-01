'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ForwardIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { revalidateCache } from '@/actions/cache'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { TextareaInput } from '@/components/form/textarea-input'
import { Button } from '@/components/ui/button'
import {
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/tanstack-query'
import {
  PATIENT_CONDITION_ENUM,
  PATIENT_CONDITION_OPTIONS,
} from '@/types/patients'
import {
  REFERRAL_CATEGORY_ENUM,
  REFERRAL_CATEGORY_OPTIONS,
} from '@/types/referrals'

const referralsFormSchema = z.object({
  date: z.string().datetime('A data é obrigatória'),
  category: z.enum(REFERRAL_CATEGORY_ENUM, {
    message: 'Categoria é obrigatório',
  }),
  condition: z.enum(PATIENT_CONDITION_ENUM, {
    message: 'O quadro é obrigatório',
  }),
  annotation: z
    .string()
    .max(500)
    .nullable()
    .transform((value) => (!value ? null : value)),
  referred_to: z
    .string()
    .nullable()
    .transform((value) => (!value ? null : value)),
})
type ReferralsFormSchema = z.infer<typeof referralsFormSchema>

interface ReferralsModalProps {
  onClose(): void
  patient: {
    id: string
    name: string
  }
}

export function ReferralsPatientModal({
  onClose,
  patient,
}: ReferralsModalProps) {
  const formMethods = useForm<ReferralsFormSchema>({
    resolver: zodResolver(referralsFormSchema),
    defaultValues: {
      name: patient.name,
      date: '',
      category: '',
      referred_to: '',
      condition: '',
      annotation: '',
    } as unknown as ReferralsFormSchema,
    mode: 'onBlur',
  })

  async function submitForm(data: ReferralsFormSchema) {
    const response = await api('/referrals', {
      method: 'POST',
      body: JSON.stringify({ ...data, patient_id: patient.id }),
    })
    if (!response.success) {
      toast.error(response.message)
      return
    }
    queryClient.invalidateQueries({
      queryKey: [QUERY_CACHE_KEYS.referrals.list],
    })
    revalidateCache(NEXT_CACHE_TAGS.patient(patient.id))
    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-2xl'>
      <DialogHeader icon={<DialogIcon icon={ForwardIcon} />}>
        <DialogTitle>Encaminhar paciente</DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            className='grid gap-4 sm:grid-cols-4'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <TextInput
              name='name'
              readOnly
              label='Nome do paciente'
              wrapperClassName='sm:col-span-4'
            />
            <SelectInput
              name='condition'
              label='Quadro Geral'
              options={PATIENT_CONDITION_OPTIONS}
              className='sm:col-span-2'
            />
            <DateInput
              name='date'
              label='Data do encaminhamento'
              wrapperClassName='sm:col-span-2'
              allowFutureDates
              isRequired
            />
            <TextInput
              name='referred_to'
              label='Profissional responsável'
              wrapperClassName='sm:col-span-2'
            />
            <SelectInput
              name='category'
              label='Categoria'
              options={REFERRAL_CATEGORY_OPTIONS}
              className='sm:col-span-2'
            />
            <TextareaInput
              rows={8}
              maxLength={500}
              name='annotation'
              label='Observações'
              placeholder='Insira observações sobre o paciente'
              wrapperClassName='sm:col-span-4'
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
          Encaminhar paciente
        </Button>
      </DialogFooter>
    </DialogContainer>
  )
}
