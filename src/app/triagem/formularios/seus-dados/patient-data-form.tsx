'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { BRAZILIAN_STATES } from '@/constants/brazilian-states'
import { GENDERS } from '@/constants/genders'
import { ROUTES } from '@/constants/routes'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'

import { useScreeningFormNavigation } from '../hooks'
import {
  screeningPatientDataFormDefaultValues,
  type ScreeningPatientDataFormSchema,
  screeningPatientDataFormSchema,
} from './patient-data-form-schema'

export function ScreeningPatientDataForm() {
  const { getStoredFormData, saveFormAndGoToPage } = useScreeningFormNavigation(
    { storageKey: SCREENING_STORAGE_KEYS.screening.patientData },
  )

  const formMethods = useForm<ScreeningPatientDataFormSchema>({
    resolver: zodResolver(screeningPatientDataFormSchema),
    values: screeningPatientDataFormDefaultValues,
    mode: 'onBlur',
  })
  const { setValue } = formMethods

  useEffect(() => {
    const savedFormData = getStoredFormData(screeningPatientDataFormSchema)

    if (savedFormData) {
      for (const [key, value] of Object.entries(savedFormData)) {
        setValue(key as keyof ScreeningPatientDataFormSchema, value)
      }
    }
  }, [setValue, getStoredFormData])

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid grid-cols-2'
        onSubmit={formMethods.handleSubmit((data) =>
          saveFormAndGoToPage({
            data,
            path: ROUTES.screening.forms.medicalReport,
          }),
        )}
      >
        <TextInput
          name='name'
          label='Nome completo'
          maxLength={50}
          placeholder='Insira seu nome completo'
          wrapperClassName='col-span-full'
          isRequired
        />

        <SelectInput
          name='gender'
          label='Gênero'
          options={GENDERS}
          placeholder='Selecione seu gênero'
          isRequired
        />
        <TextInput
          type='date'
          name='dateBirth'
          label='Data de nascimento'
          isRequired
        />

        <TextInput
          name='city'
          label='Cidade'
          maxLength={50}
          placeholder='Insira sua cidade'
          isRequired
        />
        <SelectInput
          name='state'
          label='Estado'
          options={BRAZILIAN_STATES}
          placeholder='Selecione seu estado'
          isRequired
        />

        <TextInput
          name='phone'
          label='Telefone'
          mask='phone'
          placeholder='Insira seu telefone'
          message='Insira somente números'
          inputMode='tel'
          isRequired
        />
        <TextInput
          name='cpf'
          label='CPF'
          mask='cpf'
          placeholder='Insira seu CPF'
          message='Insira somente números'
          inputMode='numeric'
          isRequired
        />

        <Button type='submit' className='col-span-full mt-6'>
          Avançar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
