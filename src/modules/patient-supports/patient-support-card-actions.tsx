'use client'

import { ClipboardPenIcon, EllipsisIcon, XCircleIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { usePermissions } from '@/hooks/use-permissions'
import type { PatientSupport } from '@/types/patient-support'

import { DeletePatientSupportModal } from './delete-patient-support-modal'
import { PatientSupportModal } from './patient-support-modal'

type PatientSupportModalMode = 'edit' | 'delete'

interface PatientSupportCardActionsProps {
  patientSupport: PatientSupport
}

export function PatientSupportCardActions({
  patientSupport,
}: Readonly<PatientSupportCardActionsProps>) {
  const [modalOpen, setModalOpen] = useState<PatientSupportModalMode | null>(
    null,
  )

  const { canUser } = usePermissions()

  const canUpdatePatientSupport = canUser('update', 'PatientSupports')
  const canDeletePatientSupport = canUser('delete', 'PatientSupports')

  if (!canUpdatePatientSupport && !canDeletePatientSupport) {
    return null
  }

  return (
    <>
      <Menu>
        <MenuTrigger
          size='icon_sm'
          variant='ghost'
          className='absolute top-5 right-4 size-8'
        >
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

          {canDeletePatientSupport && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant='destructive'
                onClick={() => setModalOpen('delete')}
              >
                <XCircleIcon />
                Excluir
              </MenuItem>
            </>
          )}
        </MenuContent>
      </Menu>

      {modalOpen === 'edit' && canUpdatePatientSupport && (
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
      )}

      {modalOpen === 'delete' && canDeletePatientSupport && (
        <Dialog
          open={modalOpen === 'delete'}
          onOpenChange={(open) => setModalOpen(open ? 'delete' : null)}
        >
          <DeletePatientSupportModal
            patientSupport={patientSupport}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}
    </>
  )
}
