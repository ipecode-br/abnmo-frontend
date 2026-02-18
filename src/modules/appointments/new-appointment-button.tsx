'use client'

import { ClipboardPlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import type { ButtonProps } from '../../components/ui/button'
import { AppointmentModal } from './appointment-modal'

interface NewAppointmentButtonProps extends ButtonProps {
  patientId?: string
}

export function NewAppointmentButton({
  patientId,
  ...props
}: Readonly<NewAppointmentButtonProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger {...props}>
        <ClipboardPlusIcon />
        Novo atendimento
      </DialogTrigger>

      {modalOpen && (
        <AppointmentModal
          patientId={patientId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
