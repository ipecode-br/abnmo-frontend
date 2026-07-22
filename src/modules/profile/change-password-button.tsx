'use client'

import { LockKeyholeOpenIcon } from 'lucide-react'
import React, { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ChangeUserPasswordModal } from './change-password-modal'

export function ChangeUserPasswordButton(props?: Readonly<ButtonProps>) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger {...props}>
        <LockKeyholeOpenIcon />
        Alterar senha
      </DialogTrigger>

      <ChangeUserPasswordModal onClose={() => setDialogOpen(false)} />
    </Dialog>
  )
}
