'use client'

import { RectangleEllipsisIcon } from 'lucide-react'
import { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog/trigger'

import PasswordModal from './password-modal'

export function ChangePasswordButton(props: Readonly<ButtonProps>) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        {...props}
        className='mr-auto text-sm font-normal'
        size='sm'
      >
        <RectangleEllipsisIcon />
        Alterar Senha
      </DialogTrigger>

      {dialogOpen && <PasswordModal onOpenChange={setDialogOpen} />}
    </Dialog>
  )
}
