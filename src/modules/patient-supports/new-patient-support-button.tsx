'use client'

import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { PatientSupportModal } from './patient-support-modal'

interface NewPatientSupportButtonProps {
  patientId: string
}

export function NewPatientSupportButton({
  patientId,
}: Readonly<NewPatientSupportButtonProps>) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger>
        <PlusIcon /> Novo contato
      </DialogTrigger>

      {isModalOpen && (
        <PatientSupportModal
          mode='create'
          patientId={patientId}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Dialog>
  )
}
