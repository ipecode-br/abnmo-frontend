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
import { usePermissions } from '@/hooks/use-permissions'
import { AppointmentModal } from '@/modules/appointments/appointment-modal'
import { DeactivatePatientModal } from '@/modules/patients/deactivate-modal'
import { ReferralModal } from '@/modules/referrals/referral-modal'
import type { PatientListItem } from '@/types/patients.d.ts'

interface PatientsTableActionsProps {
  patient: PatientListItem
}

export function PatientsTableActions({ patient }: PatientsTableActionsProps) {
  const [isReferralModalOpen, setReferralModalOpen] = useState(false)
  const [isAppointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [isDeactivateModalOpen, setDeactivateModalOpen] = useState(false)
  const { canUser } = usePermissions()
  const router = useRouter()

  const isPatientActive = patient.status === 'active'
  const canCreateAppointment = canUser('create', 'Appointments')
  const canCreateReferral = canUser('create', 'Referrals')
  const canDeactivatePatient = canUser('delete', 'Patients')

  return (
    <>
      <Menu>
        <MenuTrigger size='icon_sm' variant='ghost' aria-label='Abrir ações'>
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          {isPatientActive && (
            <>
              {canCreateReferral && (
                <MenuItem onClick={() => setReferralModalOpen(true)}>
                  <ClipboardPasteIcon />
                  Encaminhar
                </MenuItem>
              )}
              {canCreateAppointment && (
                <MenuItem onClick={() => setAppointmentModalOpen(true)}>
                  <ClipboardPlusIcon />
                  Novo atendimento
                </MenuItem>
              )}
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

          {isPatientActive && canDeactivatePatient && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant='destructive'
                onClick={() => setDeactivateModalOpen(true)}
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
          {canCreateReferral && (
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
          )}

          {canCreateAppointment && (
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
          )}

          {canDeactivatePatient && (
            <Dialog
              open={isDeactivateModalOpen}
              onOpenChange={setDeactivateModalOpen}
            >
              {isDeactivateModalOpen && (
                <DeactivatePatientModal
                  id={patient.id}
                  name={patient.name}
                  onClose={() => setDeactivateModalOpen(false)}
                />
              )}
            </Dialog>
          )}
        </>
      )}
    </>
  )
}
