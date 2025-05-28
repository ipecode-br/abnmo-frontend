'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import user from '@images/screening/user-icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'

import { useScreeningFormNavigation } from '../hooks'
import {
  screeningSupportNetworkFormDefaultValues,
  type ScreeningSupportNetworkFormSchema,
  screeningSupportNetworkFormSchema,
} from './support-network-form-schema'

export function ScreeningSupportNetworkForm() {
  const router = useRouter()

  const { getStoredFormData, saveFormAndGoToPage } = useScreeningFormNavigation(
    {
      storageKey: SCREENING_STORAGE_KEYS.screening.supportNetwork,
    },
  )

  const formMethods = useForm<ScreeningSupportNetworkFormSchema>({
    resolver: zodResolver(screeningSupportNetworkFormSchema),
    defaultValues: screeningSupportNetworkFormDefaultValues,
    mode: 'onBlur',
  })

  const { handleSubmit, reset, getValues, trigger } = formMethods

  const [contacts, setContacts] = useState<ScreeningSupportNetworkFormSchema[]>(
    [],
  )

  useEffect(() => {
    const savedFormData = getStoredFormData(screeningSupportNetworkFormSchema)

    if (savedFormData) {
      setContacts([savedFormData])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddContact = async () => {
    const isValid = await trigger()

    if (!isValid) return

    const data = getValues()

    setContacts((prev) => [...prev, data])
    reset(screeningSupportNetworkFormDefaultValues)
  }

  const handleRemoveContact = (index: number) => {
    setContacts((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFinalize = () => {
    if (contacts.length === 0) return

    // TODO: Enviar todos os dados para a API
    saveFormAndGoToPage({
      data: { supportNetwork: contacts },
      path: ROUTES.screening.forms.patientData,
    })

    reset()
    setContacts([])
  }

  return (
    <FormProvider {...formMethods}>
      <FormContainer
        className='grid grid-cols-2'
        onSubmit={(e) => e.preventDefault()}
      >
        <TextInput
          name='fullName'
          label='Nome completo'
          isRequired
          maxLength={50}
          placeholder='Insira o nome completo'
        />

        <TextInput
          name='kinship'
          label='Parentesco'
          isRequired
          maxLength={50}
          placeholder='Ex: Mãe'
        />

        <TextInput
          name='phone'
          label='Telefone para contato (WhatsApp)'
          isRequired
          placeholder='Insira o telefone'
          inputMode='tel'
          mask='phone'
          message='Insira somente números'
          wrapperClassName='col-span-full'
        />

        <Button
          type='button'
          variant='muted'
          className='col-span-full mb-7'
          onClick={handleSubmit(handleAddContact)}
        >
          Adicionar +
        </Button>

        {contacts.length > 0 && (
          <div className='col-span-full'>
            <p className='mb-4 text-sm font-medium'>Contatos adicionados:</p>

            <div className='flex flex-col gap-4'>
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between rounded-2xl border border-[#E2E4E9] p-4'
                >
                  <div className='flex items-center gap-2'>
                    <div className='relative h-10 w-10'>
                      <Image
                        src={user}
                        alt='logo de usuário'
                        fill
                        className='object-cover'
                        quality={100}
                        priority={true}
                      />
                    </div>
                    <div className='flex flex-col gap-1'>
                      <p className='text-sm'>{contact.fullName}</p>
                      <p className='text-foreground-soft text-xs'>
                        {contact.kinship} | {contact.phone}
                      </p>
                    </div>
                  </div>

                  <button
                    type='button'
                    className='cursor-pointer text-sm text-red-500 underline'
                    onClick={() => handleRemoveContact(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='col-span-full mt-6 flex flex-col gap-2 md:flex-row-reverse'>
          <Button
            type='button'
            className='md:flex-1'
            disabled={contacts.length === 0}
            onClick={handleFinalize}
          >
            Finalizar
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
