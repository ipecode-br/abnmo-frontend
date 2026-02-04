import { Avatar } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableEmptyCell,
  TableHead,
  TableHeader,
  TableLink,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { ROUTES } from '@/constants/routes'
import { PATIENT_CONDITIONS } from '@/enums/patients'
import { SPECIALTIES } from '@/enums/shared'
import type { Appointment } from '@/types/appointments'
import { formatDate } from '@/utils/formatters/format-date'

import { AppointmentsTableActions } from './actions'

interface AppointmentsTableProps {
  appointments: Appointment[]
}

export function AppointmentsTable({
  appointments,
}: Readonly<AppointmentsTableProps>) {
  const isEmpty = appointments.length <= 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-64'>Paciente</TableHead>
          <TableHead className='w-36'>Data</TableHead>
          <TableHead className='w-44'>Categoria</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead className='w-36'>Quadro geral</TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>

      {!isEmpty && (
        <TableBody>
          {appointments.map((appointment) => {
            const condition = PATIENT_CONDITIONS[appointment.condition]
            const Icon = condition.icon

            return (
              <TableRow key={appointment.id}>
                <TableCell>
                  <TableLink
                    className='w-64'
                    href={ROUTES.dashboard.patients.details.info(
                      appointment.patient_id,
                    )}
                  >
                    <Avatar
                      className='size-9'
                      src={appointment.patient.avatar_url}
                    />
                    <span className='truncate'>{appointment.patient.name}</span>
                  </TableLink>
                </TableCell>
                <TableCell>{formatDate(appointment.date)}</TableCell>
                <TableCell>{SPECIALTIES[appointment.category]}</TableCell>
                <TableCell>{appointment.professional_name ?? '-'}</TableCell>
                <TableCell>
                  <Tag variant={condition.variant} size='sm'>
                    <Icon />
                    {condition.label}
                  </Tag>
                </TableCell>

                <TableCell className='text-center'>
                  <AppointmentsTableActions appointment={appointment} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      )}

      {isEmpty && (
        <TableBody>
          <TableRow>
            <TableEmptyCell colSpan={6}>
              Nenhum atendimento registrado
            </TableEmptyCell>
          </TableRow>
        </TableBody>
      )}
    </Table>
  )
}
