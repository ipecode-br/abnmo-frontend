'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SmilePlusIcon } from 'lucide-react'
import { useId } from 'react'
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
import { Label, LabelWrapper } from '@/components/ui/label'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { PATIENT_CONDITION_OPTIONS } from '@/enums/patients'
import { SPECIALTIES_OPTIONS } from '@/enums/shared'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { usePatientOptions } from '@/hooks/use-patient-otions'
import { usePermissions } from '@/hooks/use-permissions'
import { api } from '@/lib/api'
import {
  getNullableStringSchema,
  patientConditionSchema,
  professionalNameSchema,
  specialtySchema,
  userRoleSchema,
} from '@/schemas'
import type { Referral } from '@/types/referrals'
import { parseDate } from '@/utils/parsers/parse-date'
import { validateDate } from '@/utils/validators/validate-date'

const TODAY = new Date()
const MAX_REFERRAL_YEAR = TODAY.getFullYear() + 1
const MAX_ANNOTATION_LENGTH = 500

const referralFormSchema = z
  .object({
    role: userRoleSchema,
    patientId: z.string().uuid('Paciente é obrigatório'),
    date: z
      .string()
      .min(1, 'A data é obrigatória')
      .refine(
        (value) => validateDate(value, { endYear: MAX_REFERRAL_YEAR }),
        'Insira uma data válida',
      ),
    category: specialtySchema.optional(),
    condition: patientConditionSchema,
    professionalName: professionalNameSchema,
    annotation: getNullableStringSchema(MAX_ANNOTATION_LENGTH),
  })
  .superRefine((data, ctx) => {
    if (data.role !== 'specialist' && !data.category) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Categoria é obrigatória',
        path: ['category'],
      })
    }
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
}: Readonly<ReferralModalProps>) {
  const formId = useId()
  const { patientOptions } = usePatientOptions()
  const { user } = usePermissions()

  const isCreateMode = !!patientId || !referral
  const isUserSpecialist = user?.role === 'specialist'

  const formMethods = useForm<ReferralFormSchema>({
    resolver: zodResolver(referralFormSchema),
    defaultValues: {
      role: user?.role,
      patientId: patientId ?? (referral?.patient.id || ''),
      date: referral?.date || '',
      condition: referral?.condition || '',
      category: isUserSpecialist ? undefined : referral?.category || '',
      professionalName: referral?.professionalName || '',
      annotation: referral?.annotation || '',
    } as ReferralFormSchema,
    mode: 'onBlur',
  })

  async function submitForm({
    patientId,
    date,
    category,
    condition,
    professionalName,
    annotation,
  }: ReferralFormSchema) {
    const payload: Partial<ReferralFormSchema> = {
      condition,
      annotation,
    }

    if (isCreateMode) {
      payload.patientId = patientId
      payload.category = isUserSpecialist ? undefined : category
      payload.professionalName = professionalName
    }

    const response = isCreateMode
      ? await api('/referrals', {
          body: { ...payload, date: parseDate(date) },
          method: 'POST',
        })
      : await api(`/referrals/${referral?.id}`, {
          body: { ...payload, date: parseDate(date) },
          method: 'PUT',
        })

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
      NEXT_CACHE_TAGS.patient(patientId),
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
          {isCreateMode ? 'Novo encaminhamento' : 'Atualizar encaminhamento'}
        </DialogTitle>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer
            id={formId}
            className='grid gap-4 sm:grid-cols-2'
            onSubmit={formMethods.handleSubmit(submitForm)}
          >
            <LabelWrapper className='col-span-full'>
              <Label isRequired>Paciente</Label>
              <ComboboxInput
                name='patientId'
                options={patientOptions}
                placeholder='Selecione um paciente'
                readOnly={!isCreateMode || !!referral}
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Data do encaminhamento</Label>
              <DateInput
                name='date'
                allowFutureDates
                startYear={TODAY.getFullYear() - 4}
                endYear={MAX_REFERRAL_YEAR}
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label isRequired>Quadro geral</Label>
              <SelectInput
                name='condition'
                options={PATIENT_CONDITION_OPTIONS}
              />
            </LabelWrapper>

            {!isUserSpecialist && (
              <>
                <LabelWrapper>
                  <Label isRequired>Categoria</Label>
                  <SelectInput
                    name='category'
                    readOnly={!isCreateMode}
                    options={SPECIALTIES_OPTIONS}
                  />
                </LabelWrapper>
                <LabelWrapper>
                  <Label>Profissional responsável</Label>
                  <TextInput
                    name='professionalName'
                    readOnly={!isCreateMode}
                    placeholder='Insira o nome'
                  />
                </LabelWrapper>
              </>
            )}

            <LabelWrapper className='col-span-full'>
              <Label>Observações</Label>
              <TextareaInput
                rows={9}
                showCounter
                maxLength={500}
                name='annotation'
                placeholder='Insira observações sobre o paciente'
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
          {isCreateMode ? 'Cadastrar' : 'Atualizar'}
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
