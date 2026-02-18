'use client'

import { ClipboardPasteIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import type { ButtonProps } from '../../components/ui/button'
import { ReferralModal } from './referral-modal'

interface NewReferralButtonProps extends ButtonProps {
  patientId?: string
}

export function NewReferralButton({
  patientId,
  ...props
}: Readonly<NewReferralButtonProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger {...props}>
        <ClipboardPasteIcon />
        Encaminhar
      </DialogTrigger>

      {modalOpen && (
        <ReferralModal
          patientId={patientId}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
