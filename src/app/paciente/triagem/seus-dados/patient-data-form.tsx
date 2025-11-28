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
import { BRAZILIAN_STATES_OPTIONS, type UF } from '@/constants/enums'
import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import { useCities } from '@/hooks/cities'
import { GENDERS_OPTIONS } from '@/types/patients'

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
      date_of_birth: '',
      city: '',
      state: '',
      phone: '',
      cpf: '',
    },
    mode: 'onBlur',
  })
  const { clearErrors, setValue, watch, reset } = formMethods
  const UF = watch('state') as UF
  const cities = useCities(UF)

  function handleSelectState(value: string) {
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
          options={GENDERS_OPTIONS}
          placeholder='Selecione seu gênero'
          isRequired
        />
        <DateInput
          name='date_of_birth'
          label='Data de nascimento'
          navMode='dropdown'
          isRequired
        />

        <ComboboxInput
          name='state'
          label='Estado'
          options={BRAZILIAN_STATES_OPTIONS}
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
