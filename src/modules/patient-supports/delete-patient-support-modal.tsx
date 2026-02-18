'use client'

import { CircleAlertIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'
import type { PatientSupport } from '@/types/patient-support'

interface DeletePatientSupportModalProps {
  patientSupport: PatientSupport
  onClose: () => void
}

export function DeletePatientSupportModal({
  patientSupport,
  onClose,
}: Readonly<DeletePatientSupportModalProps>) {
  const [isPending, startTransition] = useTransition()

  async function deletePatientSupport() {
    startTransition(async () => {
      const response = await api(`/patient-supports/${patientSupport.id}`, {
        method: 'DELETE',
      })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      revalidateServerCache(NEXT_CACHE_TAGS.patient(patientSupport.patient_id))

      toast.success(response.message)
      onClose()
    })
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={CircleAlertIcon} variant='destructive' />}
      >
        <DialogTitle>Excluir contato de apoio</DialogTitle>
      </DialogHeader>
      <DialogContent className='space-y-2'>
        <p>
          Tem certeza que deseja excluir o contato{' '}
          <strong>{patientSupport.name}</strong>?
        </p>
        <p>Esta ação é irreversível e não poderá ser desfeita.</p>
      </DialogContent>
      <DialogFooter>
        <Button
          className='flex-1'
          loading={isPending}
          variant='destructive'
          onClick={deletePatientSupport}
        >
          Excluir contato
        </Button>
        <DialogClose className='flex-1' disabled={isPending}>
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
