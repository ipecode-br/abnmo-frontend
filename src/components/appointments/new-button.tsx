'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog/trigger'

import type { ButtonProps } from '../ui/button'
import { AppointmentModal } from './modal'

export function NewAppointmentButton(props: Readonly<ButtonProps>) {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger {...props}>
        <PlusIcon />
        Novo atendimento
      </DialogTrigger>

      {dialogOpen && <AppointmentModal onOpenChange={setDialogOpen} />}
    </Dialog>
  )
}
