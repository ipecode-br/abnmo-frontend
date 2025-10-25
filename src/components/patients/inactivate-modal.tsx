'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { revalidateCache } from '@/actions/cache'
import { TextInput } from '@/components/form/text-input'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog/close'
import { DialogContainer } from '@/components/ui/dialog/container'
import { DialogContent } from '@/components/ui/dialog/content'
import { DialogDescription } from '@/components/ui/dialog/description'
import { DialogFooter } from '@/components/ui/dialog/footer'
import { DialogHeader } from '@/components/ui/dialog/header'
import { DialogTitle } from '@/components/ui/dialog/title'
import { CircleXIcon } from '@/components/ui/icons'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { api } from '@/lib/api'
import { queryClient } from '@/lib/tanstack-query'

interface PatientsInactivateModalProps {
  id: string
  name: string
  dropdownTrigger?: React.RefObject<HTMLButtonElement | null>
  onOpenChange: (open: boolean) => void
}

export function PatientsInactivateModal({
  id,
  name,
  dropdownTrigger,
  onOpenChange,
}: PatientsInactivateModalProps) {
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

    queryClient.invalidateQueries({ queryKey: [QUERY_CACHE_KEYS.patients] })
    revalidateCache(NEXT_CACHE_TAGS.patient(id))
    toast.success(response.message)
    onOpenChange(false)
  }

  function handleFocusOnTrigger(e: Event) {
    if (!dropdownTrigger) return

    e.preventDefault()
    dropdownTrigger?.current?.focus()
  }

  return (
    <DialogContainer
      className='sm:max-w-md'
      onCloseAutoFocus={handleFocusOnTrigger}
    >
      <DialogHeader
        icon={CircleXIcon}
        iconClassName='text-warning bg-warning/10'
      >
        <DialogTitle>Inativar {name}?</DialogTitle>
        <DialogDescription>Confirme a inativação do paciente</DialogDescription>
      </DialogHeader>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(submitForm)}>
          <DialogContent className='space-y-2'>
            <TextInput
              name='name'
              label='Digite o nome completo do paciente:'
              message={`Nome: ${name}`}
              isRequired
            />
          </DialogContent>

          <DialogFooter>
            <Button
              type='submit'
              loading={formMethods.formState.isSubmitting}
              className='bg-warning hover:bg-warning/80 flex-1'
            >
              Inativar paciente
            </Button>
            <DialogClose className='flex-1'>Cancelar</DialogClose>
          </DialogFooter>
        </form>
      </FormProvider>
    </DialogContainer>
  )
}
