'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ComboboxInput } from '@/components/form/combobox-input'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import {
  BRAZIL_STATE_OPTIONS,
  type BrazilState,
  GENDER_OPTIONS,
} from '@/enums/shared'
import { useCities } from '@/hooks/cities'

import { useScreening } from '../hooks'
import {
  type ScreeningPatientDataFormSchema,
  screeningPatientDataFormSchema,
} from './patient-data-form-schema'

export function ScreeningPatientDataForm() {
  const { saveFormAndGoToPage, getStoredFormData } = useScreening({
    storageKey: PATIENT_STORAGE_KEYS.screening.patientData,
  })

  const formMethods = useForm<ScreeningPatientDataFormSchema>({
    resolver: zodResolver(screeningPatientDataFormSchema),
    defaultValues: {
      name: '',
      gender: '',
      dateOfBirth: '',
      city: '',
      state: '',
      phone: '',
      cpf: '',
    } as unknown as ScreeningPatientDataFormSchema,
    mode: 'onBlur',
  })
  const { clearErrors, setValue, watch, reset } = formMethods
  // eslint-disable-next-line react-hooks/incompatible-library
  const UF = watch('state') as BrazilState
  const cities = useCities(UF)

  function handleSelectState(value: BrazilState) {
    setValue('state', value)
    setValue('city', '')
    clearErrors('state')
    clearErrors('city')
  }

  useEffect(() => {
    const savedFormData = getStoredFormData(screeningPatientDataFormSchema)

    if (savedFormData) {
      reset(savedFormData)
    }
  }, [getStoredFormData, reset])

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid grid-cols-2'
        onSubmit={formMethods.handleSubmit((data) =>
          saveFormAndGoToPage({
            data,
            path: ROUTES.patient.screening.medicalReport,
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
          options={GENDER_OPTIONS}
          placeholder='Selecione seu gênero'
          isRequired
        />
        <DateInput
          name='dateOfBirth'
          label='Data de nascimento'
          navMode='dropdown'
          isRequired
        />

        <ComboboxInput
          name='state'
          label='Estado'
          options={BRAZIL_STATE_OPTIONS}
          placeholder='Selecione seu estado'
          onValueChange={handleSelectState}
          isRequired
        />

        <ComboboxInput
          name='city'
          label='Cidade'
          options={cities}
          placeholder='Selecione sua cidade'
          disabled={!UF}
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
