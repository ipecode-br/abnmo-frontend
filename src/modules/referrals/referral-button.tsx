'use client'

import { ForwardIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import type { ButtonProps } from '../../components/ui/button'
import { ReferralsPatientModal } from './referrals-modal'

interface ReferPatientButtonProps extends ButtonProps {
  patient: {
    id: string
    name: string
  }
}
export function ReferPatientButton({
  patient,
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
        <ReferralsPatientModal
          patient={patient}
          onClose={() => setModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
