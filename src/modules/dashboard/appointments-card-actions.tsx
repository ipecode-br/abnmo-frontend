'use client'

import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClipboardPenIcon,
  EllipsisIcon,
  XCircleIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import type { Appointment } from '@/types/appointments'

interface DashboardAppointmentsCardActionsProps {
  appointment: Appointment
}

// TODO: create cancel appointment modal

export function DashboardAppointmentsCardActions({
  appointment,
}: Readonly<DashboardAppointmentsCardActionsProps>) {
  const router = useRouter()

  return (
    <Menu>
      <MenuTrigger size='icon' variant='ghost' className='size-8'>
        <EllipsisIcon />
        <span className='sr-only'>Ações</span>
      </MenuTrigger>

      <MenuContent align='end'>
        <MenuItem
          onClick={() => router.push(ROUTES.dashboard.appointments.list)}
        >
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
              ROUTES.dashboard.patients.details.history(appointment.patient_id),
            )
          }
        >
          <ClipboardCheckIcon />
          Histórico do paciente
        </MenuItem>

        <Divider className='my-1' />

        <MenuItem variant='destructive'>
          <XCircleIcon />
          Cancelar
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
