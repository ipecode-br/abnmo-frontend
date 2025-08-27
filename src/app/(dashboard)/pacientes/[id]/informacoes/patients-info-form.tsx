'use client'

import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm } from 'react-hook-form'

import { getCitiesByUF } from '@/actions/ibge'
import { FormContainer } from '@/components/form/form-container'
import { FormField } from '@/components/form/form-field'
import { SelectInput } from '@/components/form/select-input'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { BRAZILIAN_STATES } from '@/constants/brazilian-states'
import { yesOrNoEnum } from '@/constants/enums'
import { GENDERS } from '@/constants/genders'
import { convertObjectToOptions } from '@/helpers/convert-object-to-options'
import { PatientType } from '@/types/patients'

interface PatientsInfoFormProps {
  patient?: PatientType
  mode?: 'view' | 'edit'
}

export function PatientsInfoForm({ patient, mode }: PatientsInfoFormProps) {
  function booleanToYesNo(value?: boolean) {
    return value ? 'yes' : 'no'
  }

  const formDefaultValues = {
    ...patient,
    has_disability: booleanToYesNo(patient?.has_disability),
    disability_desc: patient?.disability_desc ?? '',
    medication_desc: patient?.medication_desc ?? '',
    take_medication: booleanToYesNo(patient?.take_medication),
    has_nmo_diagnosis: booleanToYesNo(patient?.has_nmo_diagnosis),
    need_legal_assistance: booleanToYesNo(patient?.need_legal_assistance),
  }
  const yesOrNoOptions = convertObjectToOptions(yesOrNoEnum)
  const formMethods = useForm({
    defaultValues: formDefaultValues,
    mode: 'onBlur',
  })
  const { watch } = formMethods
  const UF = watch('state') || ''
  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: [`cities/${UF}`],
    queryFn: () => getCitiesByUF(UF),
  })

  const cityOptions = cities
    ? cities.map((city) => ({ label: city, value: city }))
    : []

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        <FormField>
          <div className='flex gap-x-3'>
            <TextInput
              label='Nome completo'
              maxLength={50}
              {...formMethods.register('user.name')}
              placeholder='Insira seu nome completo'
              isRequired={mode === 'edit'}
              readOnly
            />

            <TextInput
              //Temporary Date field, will use new DateInput with formatting after merge
              name='date_of_birth'
              label='Data de nascimento'
              isRequired={mode === 'edit'}
              readOnly
            />
            <TextInput
              name='cpf'
              label='CPF'
              mask='cpf'
              placeholder='Insira seu CPF'
              message={mode === 'view' ? '' : 'Insira somente números'}
              inputMode='numeric'
              isRequired={mode === 'edit'}
              readOnly
            />
          </div>
          <div className='flex gap-x-3'>
            <SelectInput
              name='gender'
              label='Gênero'
              options={GENDERS}
              placeholder='Selecione seu gênero'
              isRequired={mode === 'edit'}
            />
            <SelectInput
              name='state'
              label='Estado'
              options={BRAZILIAN_STATES}
              isRequired={mode === 'edit'}
            />
            <SelectInput
              name='city'
              label='Cidade'
              options={cityOptions}
              loading={!!UF && isLoadingCities}
              isRequired={mode === 'edit'}
            />
            <TextInput
              name='phone'
              label='Telefone'
              mask='phone'
              placeholder='Insira seu telefone'
              message={mode === 'view' ? '' : 'Insira somente números'}
              inputMode='tel'
              isRequired={mode === 'edit'}
              readOnly
            />
          </div>
        </FormField>

        <FormField className='flex-row'>
          <SelectInput
            name='has_disability'
            label='Você possui alguma deficiência?'
            options={yesOrNoOptions}
            isRequired={mode === 'edit'}
          />
          <TextInput name='disability_desc' label='Se sim, qual?' readOnly />
        </FormField>

        <FormField className='flex-row'>
          <SelectInput
            name='take_medication'
            label='Faz uso de algum medicamento regularmente?'
            options={yesOrNoOptions}
            isRequired={mode === 'edit'}
          />
          <TextInput name='medication_desc' label='Se sim, qual?' readOnly />
        </FormField>

        <FormField className='flex-row'>
          <SelectInput
            name='has_nmo_diagnosis'
            label='Possui diagnóstico de NMO?'
            options={yesOrNoOptions}
            isRequired={mode === 'edit'}
          />
          <SelectInput
            name='need_legal_assistance'
            label='Precisa de assistência legal?'
            options={yesOrNoOptions}
          />
        </FormField>
        <Divider />
        {patient?.need_legal_assistance && (
          <>
            <h1 className='text-xl font-medium'>Rede de apoio</h1>
            {patient.supports?.map((support, i) => (
              <FormField className='flex-row' key={support.id}>
                <TextInput
                  label='Nome do contato'
                  {...formMethods.register(`supports.${i}.name`)}
                  isRequired={mode === 'edit'}
                  readOnly
                />
                <TextInput
                  label='Parentesco'
                  {...formMethods.register(`supports.${i}.kinship`)}
                  isRequired={mode === 'edit'}
                  readOnly
                />
                <TextInput
                  label='Telefone para contato (Whatsapp)'
                  {...formMethods.register(`supports.${i}.phone`)}
                  isRequired={mode === 'edit'}
                  readOnly
                />
              </FormField>
            ))}
          </>
        )}
        <Button
          type='button'
          variant='outline'
          className='text-primary ml-auto max-w-20'
        >
          Editar
        </Button>
      </FormContainer>
    </FormProvider>
  )
}
