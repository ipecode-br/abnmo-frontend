'use client'

import {
  ClipboardCheckIcon,
  ClipboardListIcon,
  ClipboardPenIcon,
  EllipsisIcon,
  Users2Icon,
  XCircleIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { NewAppointmentButton } from '@/components/appointments/new-button'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { ROUTES } from '@/constants/routes'
import { PATIENT_CONDITIONS } from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'
import { QUEUE_SERVICE_PATIENTS_MOCK } from '@/utils/mock/queue-service-patients'

export default function DashboardOverviewAppointments() {
  const patients = QUEUE_SERVICE_PATIENTS_MOCK
  const router = useRouter()

  return (
    <Card className='p-6 sm:col-span-6'>
      <DataTableHeader className='mb-8'>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          iconClassName='text-foreground-soft'
          title='Fila de atendimento'
        />

        <DataTableHeaderActions>
          <Button size='sm' variant='outline'>
            Ver todos
          </Button>

          <NewAppointmentButton size='sm' />
        </DataTableHeaderActions>
      </DataTableHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-64'>Paciente</TableHead>
            <TableHead>Data de atendimento</TableHead>
            <TableHead>Profissional</TableHead>
            <TableHead>Especialidade</TableHead>
            <TableHead>Quadro Geral</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => {
            const condition = PATIENT_CONDITIONS[patient.general_condition]
            const ConditionIcon = condition.icon
            return (
              <TableRow key={patient.id}>
                <TableCell>
                  <TableButton
                    className='w-64'
                    onClick={() =>
                      router.push(
                        ROUTES.dashboard.patients.details.info(
                          patient.id.toString(),
                        ),
                      )
                    }
                  >
                    <Avatar className='size-9' />
                    <span className='truncate'>{patient.name}</span>
                  </TableButton>
                </TableCell>
                <TableCell>{formatDate(patient.appointmentDate)}</TableCell>
                <TableCell>{patient.professional}</TableCell>
                <TableCell>{patient.specialty}</TableCell>
                <TableCell>
                  <Tag variant={condition.variant} size='sm'>
                    <ConditionIcon />
                    {condition.label}
                  </Tag>
                </TableCell>

                <TableCell className='text-center'>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      indicator={false}
                      size='icon'
                      variant='ghost'
                      className='size-8'
                    >
                      <EllipsisIcon />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end'>
                      <DropdownMenuItem>
                        <ClipboardPenIcon />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ClipboardListIcon />
                        Informações do paciente
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ClipboardCheckIcon />
                        Histórico do paciente
                      </DropdownMenuItem>

                      <Divider />

                      <DropdownMenuItem
                        variant='destructive'
                        className='text-center'
                      >
                        <XCircleIcon />
                        Cancelar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
