'use client'

import { ForwardIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import type { ButtonProps } from '../../components/ui/button'
import { ReferralPatientModal } from './referrals-modal'

interface ReferPatientButtonProps extends ButtonProps {
  id?: string
}
export function ReferPatientButton({
  id,
  ...props
}: Readonly<ReferPatientButtonProps>) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger {...props}>
        <ForwardIcon />
        Encaminhar paciente
      </DialogTrigger>

      {modalOpen && (
        <ReferralPatientModal id={id} onClose={() => setModalOpen(false)} />
      )}
    </Dialog>
  )
}
