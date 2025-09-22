'use client'

import {
  CircleXIcon,
  ClipboardEditIcon,
  EllipsisIcon,
  SendIcon,
} from 'lucide-react'
import { useRef, useState } from 'react'

import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import type { PatientType } from '@/types/patients'

import { PatientInactivateModal } from './inactivate-modal'

interface PatientsListTableActionsProps {
  patient: PatientType
}

export function PatientsListTableActions({
  patient,
}: PatientsListTableActionsProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [isInactivateModalOpen, setInactivateModalOpen] = useState(false)
  const dropdownTriggerRef = useRef<HTMLButtonElement | null>(null)

  const isPatientActive = patient.status === 'active'

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger
          size='icon'
          variant='ghost'
          className='size-8'
          ref={dropdownTriggerRef}
        >
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
        <PatientInactivateModal
          id={patient.id}
          name={patient.name}
          dropdownTrigger={dropdownTriggerRef}
          open={isInactivateModalOpen}
          onOpenChange={setInactivateModalOpen}
        />
      )}
    </>
  )
}
