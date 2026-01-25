import { Users2Icon } from 'lucide-react'

import { getAppointments } from '@/actions/appointments/get-appointments'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { NavButton } from '@/components/ui/nav-button'
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
import { NewAppointmentButton } from '@/modules/appointments/new-appointment-button'
import { formatDate } from '@/utils/formatters/format-date'

import { DashboardAppointmentsCardActions } from './appointments-card-actions'

// TODO: update dropdown menu

export async function DashboardAppointmentsCard() {
  const response = await getAppointments({ limit: 5 })

  const appointments = response?.appointments
  const showAppointments = appointments && appointments.length > 0

  return (
    <Card className='p-6 sm:col-span-6'>
      <DataTableHeader className='mb-8'>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          iconClassName='text-foreground-soft'
          title='Fila de atendimento'
        />

        <DataTableHeaderActions>
          <NavButton
            size='sm'
            variant='outline'
            href={ROUTES.dashboard.appointments.list}
          >
            Ver todos
          </NavButton>

          <NewAppointmentButton size='sm' />
        </DataTableHeaderActions>
      </DataTableHeader>

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

        {showAppointments && (
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
                      <span className='truncate'>
                        {appointment.patient.name}
                      </span>
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
                    <DashboardAppointmentsCardActions
                      appointment={appointment}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}

        {!showAppointments && (
          <TableBody>
            <TableRow>
              <TableEmptyCell colSpan={6}>
                Nenhum atendimento encontrado
              </TableEmptyCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </Card>
  )
}
