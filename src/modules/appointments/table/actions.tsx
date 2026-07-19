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
import { usePermissions } from '@/hooks/use-permissions'
import type { Appointment } from '@/types/appointments'

import { AppointmentModal } from '../appointment-modal'
import { CancelAppointmentModal } from '../cancel-appointment-modal'

type AppointmentModalMode = 'edit' | 'cancel'

interface AppointmentsTableActionsProps {
  appointment: Appointment
}

export function AppointmentsTableActions({
  appointment,
}: Readonly<AppointmentsTableActionsProps>) {
  const [modalOpen, setModalOpen] = useState<AppointmentModalMode | null>(null)
  const { canUser } = usePermissions()
  const router = useRouter()

  const allowEdit = appointment.status !== 'canceled'
  const allowCancel = !['completed', 'canceled'].includes(appointment.status)
  const canUpdateAppointment = canUser('update:appointment')
  const canCancelAppointment = canUser('cancel:appointment')

  return (
    <>
      <Menu>
        <MenuTrigger
          variant='ghost'
          className='size-8'
          aria-label='Abrir ações'
        >
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          {allowEdit && canUpdateAppointment && (
            <MenuItem onClick={() => setModalOpen('edit')}>
              <ClipboardPenIcon />
              Editar
            </MenuItem>
          )}
          <MenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.info(appointment.patient.id),
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
                  appointment.patient.id,
                ),
              )
            }
          >
            <ClipboardClockIcon />
            Histórico do paciente
          </MenuItem>

          {allowCancel && canCancelAppointment && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant='destructive'
                onClick={() => setModalOpen('cancel')}
              >
                <XCircleIcon />
                Cancelar
              </MenuItem>
            </>
          )}
        </MenuContent>
      </Menu>

      {allowEdit && canUpdateAppointment && (
        <Dialog
          open={modalOpen === 'edit'}
          onOpenChange={(open) => setModalOpen(open ? 'edit' : null)}
        >
          <AppointmentModal
            appointment={appointment}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}

      {allowCancel && canCancelAppointment && (
        <Dialog
          open={modalOpen === 'cancel'}
          onOpenChange={(open) => setModalOpen(open ? 'cancel' : null)}
        >
          <CancelAppointmentModal
            appointment={appointment}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}
    </>
  )
}
