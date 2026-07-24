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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger {...props}>
        <ClipboardPasteIcon />
        Encaminhar
      </DialogTrigger>

      {isModalOpen && (
        <ReferralModal
          patientId={patientId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
