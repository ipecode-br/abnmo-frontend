'use client'

import { EllipsisIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { ROUTES } from '@/constants/routes'
import type { PatientRequirement } from '@/types/patient-requirements'

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
      <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger size='icon' variant='ghost' className='size-8'>
          <EllipsisIcon />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.info(requirement.patient.id),
              )
            }
          >
            <User2Icon />
            Informações do paciente
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
