'use client'

import { ClipboardPenIcon, EllipsisIcon, XCircleIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
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
  const [isModalOpen, setIsModalOpen] =
    useState<PatientSupportModalMode | null>(null)

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
          <MenuItem onClick={() => setIsModalOpen('edit')}>
            <ClipboardPenIcon />
            Editar
          </MenuItem>

          <Divider className='my-1' />

          <MenuItem
            variant='destructive'
            onClick={() => setIsModalOpen('delete')}
          >
            <XCircleIcon />
            Excluir
          </MenuItem>
        </MenuContent>
      </Menu>

      {isModalOpen === 'edit' && (
        <Dialog
          open={isModalOpen === 'edit'}
          onOpenChange={(open) => setIsModalOpen(open ? 'edit' : null)}
        >
          <PatientSupportModal
            mode='edit'
            patientSupport={patientSupport}
            onClose={() => setIsModalOpen(null)}
          />
        </Dialog>
      )}

      {isModalOpen === 'delete' && (
        <Dialog
          open={isModalOpen === 'delete'}
          onOpenChange={(open) => setIsModalOpen(open ? 'delete' : null)}
        >
          <DeletePatientSupportModal
            patientSupport={patientSupport}
            onClose={() => setIsModalOpen(null)}
          />
        </Dialog>
      )}
    </>
  )
}
