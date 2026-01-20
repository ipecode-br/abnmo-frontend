'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import type { ButtonProps } from '../../components/ui/button'
import { AppointmentModal } from './appointment-modal'

export function NewAppointmentButton(props: Readonly<ButtonProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger {...props}>
        <PlusIcon />
        Novo atendimento
      </DialogTrigger>

      {modalOpen && <AppointmentModal onClose={() => setModalOpen(false)} />}
    </Dialog>
  )
}
