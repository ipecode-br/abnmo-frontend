'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import type { PatientHistory } from './patient-history.types'

interface Props {
  data: PatientHistory | null
  onClose: () => void
}

export default function PatientHistoryObservationsModal({
  data,
  onClose,
}: Props) {
  const [open, setOpen] = useState(false)

  // Sincroniza o estado do modal com o valor de `data`
  useEffect(() => {
    setOpen(!!data)
  }, [data])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) handleClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Observações</DialogTitle>
        </DialogHeader>

        <div className='mt-2 text-[16px] text-gray-700'>
          {data?.observations ?? 'Sem observações'}
        </div>

        <DialogFooter>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
