'use client'

import { ClipboardPenIcon, EllipsisIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import type { SupportContact } from '@/types/patients'

import { PatientSupportModal } from './patient-support-modal'

type PatientSupportModalMode = 'edit' | 'delete'

interface PatientSupportCardActionsProps {
  patientSupport: SupportContact
}

export function PatientSupportCardActions({
  patientSupport,
}: Readonly<PatientSupportCardActionsProps>) {
  const [modalOpen, setModalOpen] = useState<PatientSupportModalMode | null>(
    null,
  )

  const canUpdatePatientSupport = false // TODO: add PatientSupports features

  if (!canUpdatePatientSupport) {
    return null
  }

  return (
    <>
      <Menu>
        <MenuTrigger variant='ghost' className='absolute top-5 right-4 size-8'>
          <EllipsisIcon />
          <span className='sr-only'>Ações</span>
        </MenuTrigger>

        <MenuContent side='top'>
          {canUpdatePatientSupport && (
            <MenuItem onClick={() => setModalOpen('edit')}>
              <ClipboardPenIcon />
              Editar
            </MenuItem>
          )}
        </MenuContent>
      </Menu>

      <Dialog
        open={modalOpen === 'edit'}
        onOpenChange={(open) => setModalOpen(open ? 'edit' : null)}
      >
        <PatientSupportModal
          mode='edit'
          patientSupport={patientSupport}
          onClose={() => setModalOpen(null)}
        />
      </Dialog>
    </>
  )
}
