'use client'

import {
  CircleXIcon,
  ClipboardEditIcon,
  EllipsisIcon,
  SendIcon,
} from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { InactivatePatientModal } from '@/modules/patients/inactivate-modal'
import type { Patient } from '@/types/patients'

interface PatientsListTableActionsProps {
  patient: Patient
}

export function PatientsListTableActions({
  patient,
}: PatientsListTableActionsProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isInactivateModalOpen, setInactivateModalOpen] = useState(false)

  const isPatientActive = patient.status === 'active'

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger size='icon' variant='ghost' className='size-8'>
          <EllipsisIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <ClipboardEditIcon />
            Editar paciente
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SendIcon />
            Encaminhar
          </DropdownMenuItem>

          {isPatientActive && (
            <>
              <Divider />
              <DropdownMenuItem
                variant='destructive'
                onSelect={(e) => {
                  e.preventDefault()
                  setDropdownOpen(false)
                  setInactivateModalOpen(true)
                }}
              >
                <CircleXIcon />
                Inativar paciente
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isPatientActive && (
        <Dialog
          open={isInactivateModalOpen}
          onOpenChange={setInactivateModalOpen}
        >
          {isInactivateModalOpen && (
            <InactivatePatientModal
              id={patient.id}
              name={patient.name}
              onClose={() => setInactivateModalOpen(false)}
            />
          )}
        </Dialog>
      )}
    </>
  )
}
