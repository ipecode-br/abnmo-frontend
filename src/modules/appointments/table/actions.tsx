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
  const router = useRouter()

  return (
    <>
      <Menu>
        <MenuTrigger size='icon_sm' variant='ghost' aria-label='Abrir ações'>
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem onClick={() => setModalOpen('edit')}>
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
            onClick={() => setModalOpen('cancel')}
          >
            <XCircleIcon />
            Cancelar
          </MenuItem>
        </MenuContent>
      </Menu>

      {modalOpen === 'edit' && (
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

      {modalOpen === 'cancel' && (
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
