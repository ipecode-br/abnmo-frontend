'use client'

import { UserRoundMinusIcon } from 'lucide-react'
import { useState } from 'react'

import type { ButtonProps } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { DeactivatePatientModal } from '@/modules/patients/deactivate-modal'
import type { Patient } from '@/types/patients.d.ts'

interface DeactivatePatientButtonProps extends ButtonProps {
  patient: Patient
}

export function DeactivatePatientButton({
  patient,
  variant = 'outline',
  ...props
}: Readonly<DeactivatePatientButtonProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger variant={variant} {...props}>
        <UserRoundMinusIcon />
        Inativar
      </DialogTrigger>

      {isModalOpen && (
        <DeactivatePatientModal
          id={patient.id}
          name={patient.name}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
