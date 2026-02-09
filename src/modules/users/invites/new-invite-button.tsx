'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { NewUserInviteModal } from './new-invite-modal'

export function NewAppointmentButton(props: Readonly<ButtonProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger {...props}>
        <PlusIcon />
        Novo convite
      </DialogTrigger>

      {modalOpen && <NewUserInviteModal onClose={() => setModalOpen(false)} />}
    </Dialog>
  )
}
