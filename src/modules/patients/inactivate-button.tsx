'use client'

import { UserRoundMinusIcon } from 'lucide-react'
import { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { InactivatePatientModal } from '@/modules/patients/inactivate-modal'
import type { Patient } from '@/types/patients.d.ts'

interface InactivatePatientButtonProps extends ButtonProps {
  patient: Patient
}

export function InactivatePatientButton({
  patient,
  variant = 'outline',
  ...props
}: Readonly<InactivatePatientButtonProps>) {
  const [isInactivateModalOpen, setInactivateModalOpen] = useState(false)

  return (
    <Dialog open={isInactivateModalOpen} onOpenChange={setInactivateModalOpen}>
      <DialogTrigger variant={variant} {...props}>
        <UserRoundMinusIcon />
        Inativar
      </DialogTrigger>

      {isInactivateModalOpen && (
        <InactivatePatientModal
          id={patient.id}
          name={patient.name}
          onClose={() => setInactivateModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
