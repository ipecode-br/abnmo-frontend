'use client'

import { ClipboardPasteIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import type { ButtonProps } from '../../components/ui/button'
import { ReferralModal } from './referral-modal'

export function NewReferralButton(props: Readonly<ButtonProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger {...props}>
        <ClipboardPasteIcon />
        Encaminhar
      </DialogTrigger>

      {modalOpen && <ReferralModal onClose={() => setModalOpen(false)} />}
    </Dialog>
  )
}
