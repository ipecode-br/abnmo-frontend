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
import { yesOrNoEnum } from '@/constants/enums'
import { ROUTES } from '@/constants/routes'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'
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
    storageKey: SCREENING_STORAGE_KEYS.screening.medicalReport,
  })

  const formMethods = useForm<ScreeningMedicalReportFormSchema>({
    resolver: zodResolver(screeningMedicalReportFormSchema),
    defaultValues: screeningMedicalReportFormDefaultValues,
    mode: 'onBlur',
  })
  const { setValue, watch } = formMethods
  const hasDisability = watch('hasDisability') === 'yes'
  const takeMedication = watch('takeMedication') === 'yes'
  const yesOrNoOptions = convertObjectToOptions(yesOrNoEnum)

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
            name='hasDisability'
            label='Você possui alguma deficiência?'
            isRequired
            options={yesOrNoOptions}
          />
          {hasDisability && (
            <TextInput
              name='disabilityDescription'
              label='Descreva sua deficiência'
            />
          )}
        </FormField>

        <RadioInput
          name='needLegalAssistance'
          label='Precisa de assistência legal?'
          isRequired
          options={yesOrNoOptions}
        />

        <FormField>
          <RadioInput
            name='takeMedication'
            label='Faz uso de medicamentos?'
            isRequired
            options={yesOrNoOptions}
          />
          {takeMedication && (
            <TextInput
              name='medicationDescription'
              label='Quais medicamentos?'
            />
          )}
        </FormField>

        <RadioInput
          name='hasNmoDiagnosis'
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
