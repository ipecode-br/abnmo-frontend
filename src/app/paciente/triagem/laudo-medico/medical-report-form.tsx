'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { RadioInput } from '@/components/form/radio-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { YES_OR_NO } from '@/constants/enums'
import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import { convertObjectToOptions } from '@/helpers/convert-object-to-options'

import { useScreening } from '../hooks'
import {
  screeningMedicalReportFormDefaultValues,
  type ScreeningMedicalReportFormSchema,
  screeningMedicalReportFormSchema,
} from './medical-report-form-schema'

export function ScreeningMedicalReportForm() {
  const router = useRouter()
  const { getStoredFormData, saveFormAndGoToPage } = useScreening({
    storageKey: PATIENT_STORAGE_KEYS.screening.medicalReport,
  })

  const formMethods = useForm<ScreeningMedicalReportFormSchema>({
    resolver: zodResolver(screeningMedicalReportFormSchema),
    defaultValues: screeningMedicalReportFormDefaultValues,
    mode: 'onBlur',
  })
  const { setValue, watch } = formMethods
  const hasDisability = watch('has_disability') === 'yes'
  const takeMedication = watch('take_medication') === 'yes'
  const yesOrNoOptions = convertObjectToOptions(YES_OR_NO)

  useEffect(() => {
    const savedFormData = getStoredFormData(screeningMedicalReportFormSchema)

    if (savedFormData) {
      for (const [key, value] of Object.entries(savedFormData)) {
        setValue(key as keyof ScreeningMedicalReportFormSchema, value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='gap-8'
        onSubmit={formMethods.handleSubmit((data) =>
          saveFormAndGoToPage({
            data,
            path: ROUTES.patient.screening.supportNetwork,
          }),
        )}
      >
        <FormField>
          <RadioInput
            name='has_disability'
            label='Você possui alguma deficiência?'
            isRequired
            options={yesOrNoOptions}
          />
          {hasDisability && (
            <TextInput
              name='disability_desc'
              label='Descreva sua deficiência'
            />
          )}
        </FormField>

        <RadioInput
          name='need_legal_assistance'
          label='Precisa de assistência legal?'
          isRequired
          options={yesOrNoOptions}
        />

        <FormField>
          <RadioInput
            name='take_medication'
            label='Faz uso de medicamentos?'
            isRequired
            options={yesOrNoOptions}
          />
          {takeMedication && (
            <TextInput name='medication_desc' label='Quais medicamentos?' />
          )}
        </FormField>

        <RadioInput
          name='has_nmo_diagnosis'
          label='Você possui um Diagnóstico de NMO?'
          isRequired
          options={yesOrNoOptions}
        />

        <div className='mt-6 flex flex-col gap-2 md:flex-row-reverse'>
          <Button type='submit' className='md:flex-1'>
            Próxima etapa
          </Button>
          <Button
            type='button'
            variant='muted'
            className='md:flex-1'
            onClick={() => router.back()}
          >
            Voltar
          </Button>
        </div>
      </FormContainer>
    </FormProvider>
  )
}
