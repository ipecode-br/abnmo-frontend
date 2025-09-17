'use client'

import { CircleXIcon, Edit, EllipsisIcon, SendIcon } from 'lucide-react'
import { useState } from 'react'

import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

import { PatientInactivateModal } from '../(patients-list)/inactivate-patient'

interface PatientsListTableActionsProps {
  id: string
  name: string
}

export function PatientsListTableActions({
  id,
  name,
}: PatientsListTableActionsProps) {
  const [openInactivate, setOpenInactivate] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          variant='ghost'
          size='icon'
          indicator={false}
          className='size-8'
        >
          <EllipsisIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem>
            <Edit />
            Editar paciente
          </DropdownMenuItem>

          <DropdownMenuItem>
            <SendIcon />
            Encaminhar
          </DropdownMenuItem>

          <Divider />

          <DropdownMenuItem
            variant='destructive'
            onClick={() => setOpenInactivate(true)}
          >
            <CircleXIcon />
            Inativar paciente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PatientInactivateModal
        id={id}
        name={name}
        open={openInactivate}
        onClose={() => setOpenInactivate(false)}
      />
    </>
  )
}
