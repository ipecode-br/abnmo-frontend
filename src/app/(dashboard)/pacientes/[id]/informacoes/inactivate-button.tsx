'use client'

import { useState } from 'react'

import { PatientsInactivateModal } from '@/components/patients/inactivate-modal'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@/components/ui/dialog/trigger'
import { UserRoundMinusIcon } from '@/components/ui/icons'
import type { PatientType } from '@/types/patients'

interface PatientInactivateButtonProps {
  patient: PatientType
}

export function PatientInactivateButton({
  patient,
}: Readonly<PatientInactivateButtonProps>) {
  const [isInactivateModalOpen, setInactivateModalOpen] = useState(false)

  return (
    <Dialog open={isInactivateModalOpen} onOpenChange={setInactivateModalOpen}>
      <DialogTrigger variant='outline'>
        <UserRoundMinusIcon />
        Inativar paciente
      </DialogTrigger>

      {isInactivateModalOpen && (
        <PatientsInactivateModal
          id={patient.id}
          name={patient.name}
          onOpenChange={setInactivateModalOpen}
        />
      )}
    </Dialog>
  )
}
