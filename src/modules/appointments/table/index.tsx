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
import { APPOINTMENT_STATUSES } from '@/enums/appointments'
import { PATIENT_CONDITIONS } from '@/enums/patients'
import { SPECIALTIES } from '@/enums/shared'
import type { Appointment } from '@/types/appointments'
import { formatDate } from '@/utils/formatters/format-date'

import { AppointmentsTableActions } from './actions'
import { AppointmentsTableSkeleton } from './skeleton'

interface AppointmentsTableProps {
  appointments: Appointment[]
  loading?: boolean
}

export function AppointmentsTable({
  appointments,
  loading,
}: Readonly<AppointmentsTableProps>) {
  const isEmpty = !loading && appointments.length <= 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-64'>Paciente</TableHead>
          <TableHead className='w-36'>Data</TableHead>
          <TableHead className='w-48'>Categoria</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead className='w-36'>Quadro geral</TableHead>
          <TableHead className='w-36'>Status</TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && <AppointmentsTableSkeleton />}

        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={6}>
              Nenhum atendimento registrado
            </TableEmptyCell>
          </TableRow>
        )}

        {!isEmpty &&
          appointments.map((appointment) => {
            const status = APPOINTMENT_STATUSES[appointment.status]
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
                <TableCell>
                  <Tag size='sm'>{SPECIALTIES[appointment.category]}</Tag>
                </TableCell>
                <TableCell>{appointment.professional_name ?? '-'}</TableCell>
                <TableCell>
                  <Tag variant={condition.variant} size='sm'>
                    <Icon />
                    {condition.label}
                  </Tag>
                </TableCell>
                <TableCell>
                  <Tag variant={status.variant} size='sm'>
                    {status.label}
                  </Tag>
                </TableCell>
                <TableCell className='text-center'>
                  <AppointmentsTableActions appointment={appointment} />
                </TableCell>
              </TableRow>
            )
          })}
      </TableBody>
    </Table>
  )
}
