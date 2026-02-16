'use client'

import { EditIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import type { PatientSupport } from '@/types/patient-support'

import { PatientSupportModal } from './patient-support-modal'

interface UpdatePatientSupportButtonProps {
  patientSupport: PatientSupport
}

export function UpdatePatientSupportButton({
  patientSupport,
}: Readonly<UpdatePatientSupportButtonProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger size='xs' variant='outline'>
        <EditIcon /> Editar
      </DialogTrigger>

      {isModalOpen && (
        <PatientSupportModal
          mode='edit'
          patientSupport={patientSupport}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
