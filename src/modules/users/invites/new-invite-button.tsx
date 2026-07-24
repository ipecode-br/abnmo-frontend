'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { NewUserInviteModal } from './new-invite-modal'

export function NewInviteButton(props: Readonly<ButtonProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger {...props}>
        <PlusIcon />
        Novo convite
      </DialogTrigger>

      {isModalOpen && (
        <NewUserInviteModal onClose={() => setIsModalOpen(false)} />
      )}
    </Dialog>
  )
}
