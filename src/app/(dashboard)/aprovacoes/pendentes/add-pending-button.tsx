'use client'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

import { PendingRequirementsModal } from '@/app/(dashboard)/aprovacoes/pendentes/pending-requirements-modal'
import type { ButtonProps } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog/index'
import { DialogTrigger } from '@/components/ui/dialog/trigger'

export function PendingButton(props: Readonly<ButtonProps>) {
  const [isPendindModalOpen, setIsPendingModalOpen] = useState(false)

  return (
    <Dialog open={isPendindModalOpen} onOpenChange={setIsPendingModalOpen}>
      <DialogTrigger {...props}>
        <PlusIcon />
        Adicionar pendência
      </DialogTrigger>

      {isPendindModalOpen && (
        <PendingRequirementsModal onOpenChange={setIsPendingModalOpen} />
      )}
    </Dialog>
  )
}
