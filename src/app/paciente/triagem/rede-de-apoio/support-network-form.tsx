'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ScreeningSupportNetworkCards } from '@/app/paciente/triagem/rede-de-apoio/support-netword-cards'
import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { SCREENING_STORAGE_KEYS } from '@/constants/storage-keys'
import { setStorageItem } from '@/helpers/local-storage'

import { useScreening } from '../hooks'
import {
  screeningSupportNetworkContactsSchema,
  screeningSupportNetworkFormDefaultValues,
  type ScreeningSupportNetworkFormSchema,
  screeningSupportNetworkFormSchema,
} from './support-network-form-schema'

export function ScreeningSupportNetworkForm() {
  const [contacts, setContacts] = useState<ScreeningSupportNetworkFormSchema[]>(
    [],
  )
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const { getStoredFormData, finishScreening } = useScreening({
    storageKey: SCREENING_STORAGE_KEYS.screening.supportNetwork,
  })

  const formMethods = useForm<ScreeningSupportNetworkFormSchema>({
    resolver: zodResolver(screeningSupportNetworkFormSchema),
    defaultValues: screeningSupportNetworkFormDefaultValues,
    mode: 'onBlur',
  })

  async function handleAddContact(data: ScreeningSupportNetworkFormSchema) {
    const contactExists = contacts.find((contact) => contact.name === data.name)

    if (contactExists) {
      toast.error('Este contato já foi adicionado')
      return
    }

    const updatedContacts = [...contacts, data]
    setContacts(updatedContacts)
    setStorageItem(
      SCREENING_STORAGE_KEYS.screening.supportNetwork,
      updatedContacts,
    )

    formMethods.reset(screeningSupportNetworkFormDefaultValues)
  }

  const handleRemoveContact = (name: string) => {
    const updatedContacts = contacts.filter((contact) => contact.name !== name)
    setContacts(updatedContacts)
    setStorageItem(
      SCREENING_STORAGE_KEYS.screening.supportNetwork,
      updatedContacts,
    )
  }

  async function handleFinalize() {
    startTransition(async () => await finishScreening())
  }

  useEffect(() => {
    const savedData = getStoredFormData(screeningSupportNetworkContactsSchema)

    if (savedData) {
      setContacts(savedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='space-y-12'>
      <FormProvider {...formMethods}>
        <FormContainer
          className='grid grid-cols-2'
          onSubmit={formMethods.handleSubmit(handleAddContact)}
        >
          <TextInput
            name='name'
            label='Nome completo'
            maxLength={50}
            placeholder='Insira o nome completo'
          />

          <TextInput
            name='kinship'
            label='Parentesco'
            maxLength={50}
            placeholder='Ex: Mãe'
          />

          <TextInput
            name='phone'
            label='Telefone para contato (WhatsApp)'
            placeholder='Insira o telefone'
            inputMode='tel'
            mask='phone'
            message='Insira somente números'
            wrapperClassName='col-span-full'
          />

          <Button
            variant='muted'
            disabled={isPending}
            className='col-span-full [&_svg]:size-4'
          >
            Adicionar
            <PlusIcon />
          </Button>
        </FormContainer>
      </FormProvider>

      <ScreeningSupportNetworkCards
        contacts={contacts}
        isPending={isPending}
        onRemove={handleRemoveContact}
      />

      <div className='flex flex-col gap-2 md:flex-row-reverse'>
        <Button
          className='md:flex-1'
          onClick={handleFinalize}
          loading={isPending}
        >
          Finalizar
        </Button>

        <Button
          type='button'
          variant='muted'
          className='md:flex-1'
          onClick={() => router.back()}
          disabled={isPending}
        >
          Voltar
        </Button>
      </div>
    </div>
  )
}
