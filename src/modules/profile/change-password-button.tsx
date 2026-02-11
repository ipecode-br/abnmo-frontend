'use client'

import { RectangleEllipsisIcon } from 'lucide-react'
import React, { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ChangeUserPasswordModal } from './change-password-modal'

export function ChangeUserPasswordButton(props?: Readonly<ButtonProps>) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger {...props}>
        <RectangleEllipsisIcon />
        Alterar senha
      </DialogTrigger>

      {dialogOpen && (
        <ChangeUserPasswordModal onClose={() => setDialogOpen(false)} />
      )}
    </Dialog>
  )
}
