'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleXIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { revalidateCache } from '@/actions/cache'
import { FormContainer } from '@/components/form/form-container'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/tanstack-query'

interface InactivatePatientModalProps {
  id: string
  name: string
  onClose: () => void
}

export function InactivatePatientModal({
  id,
  name,
  onClose,
}: Readonly<InactivatePatientModalProps>) {
  const inactivatePatientFormSchema = z.object({
    name: z.string().refine((val) => val === name, {
      message: `Insira o nome do paciente corretamente: ${name}`,
    }),
  })
  type InactivatePatientFormSchema = z.infer<typeof inactivatePatientFormSchema>

  const formMethods = useForm<InactivatePatientFormSchema>({
    resolver: zodResolver(inactivatePatientFormSchema),
    defaultValues: { name: '' },
    mode: 'onSubmit',
  })

  async function submitForm() {
    const response = await api(`/patients/${id}/inactivate`, {
      method: 'PATCH',
    })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    queryClient.invalidateQueries({
      queryKey: [QUERY_CACHE_KEYS.patients.list],
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_CACHE_KEYS.patients.allActive],
    })
    revalidateCache(NEXT_CACHE_TAGS.patient(id))
    toast.success(response.message)
    onClose()
  }

  return (
    <DialogContainer className='max-w-md'>
      <DialogHeader
        icon={
          <DialogIcon
            icon={CircleXIcon}
            className='text-warning bg-warning/10 border-none'
          />
        }
      >
        <DialogTitle>Inativar {name}?</DialogTitle>
        <DialogDescription>Confirme a inativação do paciente</DialogDescription>
      </DialogHeader>

      <DialogContent>
        <FormProvider {...formMethods}>
          <FormContainer onSubmit={formMethods.handleSubmit(submitForm)}>
            <TextInput
              name='name'
              label='Digite o nome completo do paciente:'
              message={`Nome: ${name}`}
              isRequired
            />
          </FormContainer>
        </FormProvider>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          variant='destructive'
          loading={formMethods.formState.isSubmitting}
          onClick={formMethods.handleSubmit(submitForm)}
        >
          Inativar paciente
        </Button>
        <DialogClose
          className='flex-1'
          disabled={formMethods.formState.isSubmitting}
        >
          Cancelar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
