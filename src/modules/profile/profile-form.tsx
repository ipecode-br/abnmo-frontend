'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { DateInput } from '@/components/form/date-input'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { TextInput } from '@/components/form/text-input'

export function ProfileForm() {
  const formMethods = useForm({
    defaultValues: {
      name: 'Claudio Luiz Oliveira',
      entry_date: String(new Date()),
      professional: 'Enfermagem',
      specialty: 'Enfermagem',
      professional_registration: 'COREN-SP 112233',
    },
    mode: 'onBlur',
  })

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        <FormField className='grid grid-cols-2 gap-4'>
          <TextInput name='name' label='Nome completo' readOnly />
          <DateInput name='entry_date' label='Data de entrada' readOnly />
        </FormField>

        <FormField className='grid grid-cols-3 gap-4'>
          <TextInput name='professional' label='Profissional' readOnly />
          <TextInput name='specialty' label='Especialidade' readOnly />
          <TextInput
            name='professional_registration'
            label='Registro profissional'
            readOnly
          />
        </FormField>
      </FormContainer>
    </FormProvider>
  )
}
