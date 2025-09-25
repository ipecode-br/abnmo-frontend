'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { getCitiesByUF } from '@/actions/ibge'
import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { BRAZILIAN_STATES_OPTIONS } from '@/constants/enums'
import { ROUTES } from '@/constants/routes'
import { PATIENT_STORAGE_KEYS } from '@/constants/storage-keys'
import { GENDERS_OPTIONS } from '@/types/patients'

import { useScreening } from '../hooks'
import {
  screeningPatientDataFormDefaultValues,
  type ScreeningPatientDataFormSchema,
  screeningPatientDataFormSchema,
} from './patient-data-form-schema'

export function ScreeningPatientDataForm() {
  const { saveFormAndGoToPage, getStoredFormData } = useScreening({
    storageKey: PATIENT_STORAGE_KEYS.screening.patientData,
  })

  const formMethods = useForm<ScreeningPatientDataFormSchema>({
    resolver: zodResolver(screeningPatientDataFormSchema),
    values: screeningPatientDataFormDefaultValues,
    mode: 'onBlur',
  })
  const { setValue, watch, clearErrors } = formMethods
  const UF = watch('state')

  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: [`cities/${UF}`],
    queryFn: () => getCitiesByUF(UF),
  })

  const cityOptions = cities
    ? cities.map((city) => ({ label: city, value: city }))
    : []

  useEffect(() => {
    const savedFormData = getStoredFormData(screeningPatientDataFormSchema)

    if (savedFormData) {
      for (const [key, value] of Object.entries(savedFormData)) {
        setValue(key as keyof ScreeningPatientDataFormSchema, value)
      }
    }
  }, [setValue, getStoredFormData])

  useEffect(() => {
    if (UF) {
      clearErrors('city')
      setValue('city', '')
    }
  }, [UF, clearErrors, setValue])

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
          name='dateBirth'
          label='Data de nascimento'
          navMode='dropdown'
          blockFutureDates
          isRequired
        />

        <SelectInput
          name='state'
          label='Estado'
          options={BRAZILIAN_STATES_OPTIONS}
          placeholder='Selecione seu estado'
          isRequired
        />

        <SelectInput
          name='city'
          label='Cidade'
          options={cityOptions}
          placeholder={
            UF && isLoadingCities
              ? 'Carregando cidades...'
              : 'Selecione sua cidade'
          }
          loading={!!UF && isLoadingCities}
          disabled={!UF}
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
