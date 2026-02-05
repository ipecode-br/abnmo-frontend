'use client'

import {
  ClipboardListIcon,
  ClipboardPasteIcon,
  ClipboardPlusIcon,
  EllipsisIcon,
  XCircleIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import { AppointmentModal } from '@/modules/appointments/appointment-modal'
import { InactivatePatientModal } from '@/modules/patients/inactivate-modal'
import { ReferralModal } from '@/modules/referrals/referral-modal'
import type { Patient } from '@/types/patients.d.ts'

interface PatientsTableActionsProps {
  patient: Patient
}

export function PatientsTableActions({ patient }: PatientsTableActionsProps) {
  const [isReferralModalOpen, setReferralModalOpen] = useState(false)
  const [isAppointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [isInactivateModalOpen, setInactivateModalOpen] = useState(false)

  const router = useRouter()

  const isPatientActive = patient.status === 'active'

  return (
    <>
      <Menu>
        <MenuTrigger size='icon' variant='ghost' className='size-8'>
          <EllipsisIcon />
          <span className='sr-only'>Ações</span>
        </MenuTrigger>

        <MenuContent align='end'>
          {isPatientActive && (
            <>
              <MenuItem onClick={() => setReferralModalOpen(true)}>
                <ClipboardPasteIcon />
                Encaminhar
              </MenuItem>
              <MenuItem onClick={() => setAppointmentModalOpen(true)}>
                <ClipboardPlusIcon />
                Novo atendimento
              </MenuItem>
            </>
          )}

          <MenuItem
            onClick={() =>
              router.push(ROUTES.dashboard.patients.details.info(patient.id))
            }
          >
            <ClipboardListIcon />
            Ver informações
          </MenuItem>

          {isPatientActive && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant='destructive'
                onClick={() => setInactivateModalOpen(true)}
              >
                <XCircleIcon />
                Inativar paciente
              </MenuItem>
            </>
          )}
        </MenuContent>
      </Menu>

      {isPatientActive && (
        <>
          <Dialog
            open={isReferralModalOpen}
            onOpenChange={setReferralModalOpen}
          >
            {isReferralModalOpen && (
              <ReferralModal
                patientId={patient.id}
                onClose={() => setReferralModalOpen(false)}
              />
            )}
          </Dialog>
          <Dialog
            open={isAppointmentModalOpen}
            onOpenChange={setAppointmentModalOpen}
          >
            {isAppointmentModalOpen && (
              <AppointmentModal
                patientId={patient.id}
                onClose={() => setAppointmentModalOpen(false)}
              />
            )}
          </Dialog>
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
        </>
      )}
    </>
  )
}
