'use client'

import { EllipsisIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import type { PatientRequirement } from '@/types/patient-requirements.d.ts'

interface ApprovedPatientRequirementsListTableActionsProps {
  requirement: PatientRequirement
}

// TODO: add modal with requirement details
export function ApprovedPatientRequirementsListTableActions({
  requirement,
}: Readonly<ApprovedPatientRequirementsListTableActionsProps>) {
  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Menu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <MenuTrigger variant='ghost' className='size-8'>
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.info(requirement.patient.id),
              )
            }
          >
            <User2Icon />
            Informações do paciente
          </MenuItem>
        </MenuContent>
      </Menu>
    </>
  )
}
