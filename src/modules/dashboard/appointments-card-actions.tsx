'use client'

import {
  ClipboardClockIcon,
  ClipboardListIcon,
  ClipboardPenIcon,
  EllipsisIcon,
  XCircleIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import type { Appointment } from '@/types/appointments'

import { CancelAppointmentModal } from '../appointments/cancel-appointment-modal'

interface DashboardAppointmentsCardActionsProps {
  appointment: Appointment
}

// TODO: add edit appointment functionality

export function DashboardAppointmentsCardActions({
  appointment,
}: Readonly<DashboardAppointmentsCardActionsProps>) {
  const [cancelModalOpen, setCancelModalOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Menu>
        <MenuTrigger size='icon' variant='ghost' className='size-8'>
          <EllipsisIcon />
          <span className='sr-only'>Ações</span>
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem>
            <ClipboardPenIcon />
            Editar
          </MenuItem>
          <MenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.info(appointment.patient_id),
              )
            }
          >
            <ClipboardListIcon />
            Informações do paciente
          </MenuItem>
          <MenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.history(
                  appointment.patient_id,
                ),
              )
            }
          >
            <ClipboardClockIcon />
            Histórico do paciente
          </MenuItem>

          <Divider className='my-1' />

          <MenuItem
            variant='destructive'
            onClick={() => setCancelModalOpen(true)}
          >
            <XCircleIcon />
            Cancelar
          </MenuItem>
        </MenuContent>
      </Menu>

      {cancelModalOpen && (
        <Dialog open={cancelModalOpen} onOpenChange={setCancelModalOpen}>
          <CancelAppointmentModal
            appointment={appointment}
            onClose={() => setCancelModalOpen(false)}
          />
        </Dialog>
      )}
    </>
  )
}
