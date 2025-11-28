'use client'

import { UserRoundMinusIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { InactivatePatientModal } from '@/modules/patients/inactivate-modal'
import type { PatientType } from '@/types/patients'

interface InactivatePatientButtonProps {
  patient: PatientType
}

export function InactivatePatientButton({
  patient,
}: Readonly<InactivatePatientButtonProps>) {
  const [isInactivateModalOpen, setInactivateModalOpen] = useState(false)

  return (
    <Dialog open={isInactivateModalOpen} onOpenChange={setInactivateModalOpen}>
      <DialogTrigger variant='outline'>
        <UserRoundMinusIcon />
        Inativar paciente
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
