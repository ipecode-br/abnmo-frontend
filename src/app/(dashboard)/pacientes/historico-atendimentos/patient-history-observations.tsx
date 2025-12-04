'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { PatientHistory } from './patient-history.types'

interface Props {
  data: PatientHistory | null
  onClose: () => void
}

export default function PatientHistoryObservationsModal({
  data,
  onClose,
}: Props) {
  if (!data) return null

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Observações do atendimento</DialogTitle>
        </DialogHeader>

        <p className='text-sm whitespace-pre-wrap'>{data.observations}</p>

        <div className='mt-4 flex justify-end'>
          <Button variant='outline' onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
