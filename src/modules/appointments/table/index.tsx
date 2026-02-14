import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
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

type HideAppointmentsColumns = 'name' | 'status'

interface AppointmentsTableProps {
  appointments: Appointment[]
  hideColumns?: HideAppointmentsColumns[]
  loading?: boolean
}

export function AppointmentsTable({
  appointments,
  hideColumns = [],
  loading,
}: Readonly<AppointmentsTableProps>) {
  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  const isEmpty = !loading && appointments.length <= 0
  const showPatientName = !hideColumns.includes('name')
  const showStatus = !hideColumns.includes('status')

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showPatientName && <TableHead className='w-64'>Paciente</TableHead>}
          <TableHead className='w-36'>Data</TableHead>
          <TableHead className='w-48'>Categoria</TableHead>
          <TableHead>Profissional</TableHead>
          <TableHead className='w-36'>Quadro geral</TableHead>
          {showStatus && <TableHead className='w-36'>Status</TableHead>}
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={7}>
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
                {showPatientName && (
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
                      <span className='truncate'>
                        {appointment.patient.name}
                      </span>
                    </TableLink>
                  </TableCell>
                )}
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
                {showStatus && (
                  <TableCell>
                    <Tag variant={status.variant} size='sm'>
                      {status.label}
                    </Tag>
                  </TableCell>
                )}
                <TableCell className='text-center'>
                  {appointment.status !== 'canceled' && (
                    <AppointmentsTableActions appointment={appointment} />
                  )}
                </TableCell>
              </TableRow>
            )
          })}

        {loading &&
          skeletons.map((skeleton) => (
            <TableRow key={skeleton}>
              {showPatientName && (
                <TableCell>
                  <div className='flex w-64 items-center gap-2'>
                    <Skeleton className='size-9 rounded-full' />
                    <Skeleton className='h-5 w-44 rounded-md' />
                  </div>
                </TableCell>
              )}
              <TableCell>
                <Skeleton className='h-5 w-24 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-36 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-40 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-24 rounded-md' />
              </TableCell>
              {showStatus && (
                <TableCell>
                  <Skeleton className='h-6 w-28 rounded-md' />
                </TableCell>
              )}
              <TableCell>
                <Skeleton className='mx-auto size-8 rounded-md' />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
