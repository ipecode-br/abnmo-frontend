'use client'

import { MoreVerticalIcon, PlusIcon, Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { AppointmentConditionTag } from '@/components/tags/appointment-condition'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

export default function ServiceQueueCard() {
  const patients = QUEUE_SERVICE_PATIENTS_MOCK
  const router = useRouter()

  return (
    <Card className='col-span-1 p-6 md:col-span-3'>
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
          {patients.map((patient, index) => {
            const isLastRow = index === patients.length - 1
            return (
              <TableRow key={patient.id}>
                <TableCell isLastRow={isLastRow}>
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

                <TableCell isLastRow={isLastRow}>
                  {formatDate(patient.appointmentDate)}
                </TableCell>

                <TableCell isLastRow={isLastRow}>
                  {patient.professional}
                </TableCell>

                <TableCell isLastRow={isLastRow}>{patient.specialty}</TableCell>

                <TableCell isLastRow={isLastRow}>
                  <AppointmentConditionTag
                    label={patient.general_condition as PatientConditionType}
                  />
                </TableCell>

                <TableCell isLastRow={isLastRow}>
                  <Button variant='ghost' size='icon'>
                    <MoreVerticalIcon />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
