'use client'

import { RectangleEllipsisIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { ChangePasswordModal } from './change-password-modal'

export function ChangePasswordButton() {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className='mr-auto' size='sm'>
        <RectangleEllipsisIcon />
        Alterar senha
      </DialogTrigger>

      {dialogOpen && <ChangePasswordModal onOpenChange={setDialogOpen} />}
    </Dialog>
  )
}
