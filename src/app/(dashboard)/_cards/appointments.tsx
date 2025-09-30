'use client'

import {
  ClipboardClock,
  ClipboardList,
  ClipboardPen,
  EllipsisIcon,
  PlusIcon,
  Users2Icon,
  XCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { AppointmentConditionTag } from '@/components/tags/appointment-condition'
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ROUTES } from '@/constants/routes'
import { PatientConditionType } from '@/types/patients'
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
          emptyTitle='Fila de atendimento'
        />

        <DataTableHeaderActions>
          <Button size='sm' variant='outline'>
            Ver todos
          </Button>

          <Button size='sm'>
            <PlusIcon />
            Novo atendimento
          </Button>
        </DataTableHeaderActions>
      </DataTableHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Paciente</TableHead>
            <TableHead>Data de atendimento</TableHead>
            <TableHead>Profissional</TableHead>
            <TableHead>Especialidade</TableHead>
            <TableHead>Quadro Geral</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => {
            return (
              <TableRow key={patient.id}>
                <TableCell>
                  <button
                    className='cursor-pointer'
                    onClick={() =>
                      router.push(
                        ROUTES.dashboard.patients.details.info(
                          patient.id.toString(),
                        ),
                      )
                    }
                  >
                    <div className='flex min-w-0 items-center gap-2'>
                      <Avatar className='size-8' />
                      <span className='truncate'>{patient.name}</span>
                    </div>
                  </button>
                </TableCell>

                <TableCell>{formatDate(patient.appointmentDate)}</TableCell>

                <TableCell>{patient.professional}</TableCell>

                <TableCell>{patient.specialty}</TableCell>

                <TableCell>
                  <AppointmentConditionTag
                    label={patient.general_condition as PatientConditionType}
                  />
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
                        <ClipboardPen />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ClipboardList />
                        Informações do paciente
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ClipboardClock />
                        Histórico do paciente
                      </DropdownMenuItem>

                      <Divider />

                      <DropdownMenuItem
                        variant='destructive'
                        className='text-center'
                      >
                        <XCircle />
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
