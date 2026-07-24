'use client'

import { LockKeyholeOpenIcon } from 'lucide-react'
import React, { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ChangeUserPasswordModal } from './change-password-modal'

export function ChangeUserPasswordButton(props?: Readonly<ButtonProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger {...props}>
        <LockKeyholeOpenIcon />
        Alterar senha
      </DialogTrigger>

      {isModalOpen && (
        <ChangeUserPasswordModal onClose={() => setIsModalOpen(false)} />
      )}
    </Dialog>
  )
}
