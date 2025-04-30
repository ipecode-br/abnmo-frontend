'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { GENRES } from '@/constants/genres'
import { ROUTES } from '@/constants/routes'
import { BRAZILIAN_STATES } from '@/constants/states'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'

import { useFormNavigation } from '../hooks/use-form-navigation'
import {
  yourDataFormDefaultValues,
  YourDataFormSchema,
  yourDataFormSchema,
} from './your-data-form-schema'

export default function PatientPage() {
  const { goPage, getStored } = useFormNavigation(
    SCREENING_STORAGE_KEYS.screening.patientData,
  )

  const formMethods = useForm<YourDataFormSchema>({
    resolver: zodResolver(yourDataFormSchema),
    defaultValues: {
      ...yourDataFormDefaultValues,
      ...getStored,
    },
    mode: 'onBlur',
  })

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='max-w-[29.625rem]'
        onSubmit={formMethods.handleSubmit((data) =>
          goPage({ data, path: ROUTES.screening.forms.medicalReport }),
        )}
      >
        <FormField className='space-y-4 pb-4'>
          <TextInput
            maxLength={100}
            name='name'
            label='Nome completo'
            placeholder='Insira seu nome completo'
            isRequired
          />

          <div className='grid grid-cols-2 gap-6'>
            <SelectInput
              name='gender'
              options={GENRES}
              label='Gênero'
              placeholder='Feminino'
              isRequired
            />

            <TextInput
              type='date'
              name='dateBirth'
              label='Data de nascimento'
              isRequired
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <TextInput
              name='city'
              maxLength={50}
              label='Cidade'
              placeholder='São Paulo'
              isRequired
            />

            <SelectInput
              name='state'
              label='Estado'
              isRequired
              placeholder='SP'
              options={BRAZILIAN_STATES}
            />
          </div>

          <div className='flex gap-6'>
            <TextInput
              maxLength={15}
              name='phone'
              label='Telefone'
              placeholder='(11) 99999-9999'
              isRequired
            />
            <TextInput
              maxLength={14}
              name='cpf'
              label='CPF'
              placeholder='000.000.000-00'
              isRequired
            />
          </div>
        </FormField>

        <Button type='submit'>Avançar</Button>
      </FormContainer>
    </FormProvider>
  )
}
