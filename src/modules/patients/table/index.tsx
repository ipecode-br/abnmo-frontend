'use client'

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
import { PATIENT_STATUSES } from '@/enums/patients'
import type { PatientListItem } from '@/types/patients.d.ts'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { PatientsTableActions } from './actions'

interface PatientsTableProps {
  patients: PatientListItem[]
  loading?: boolean
}

export function PatientsTable({
  patients,
  loading,
}: Readonly<PatientsTableProps>) {
  const skeletons = Array.from({ length: 10 }).map((_, index) => index)

  const isEmpty = !loading && patients.length <= 0

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-64'>Nome do paciente</TableHead>
          <TableHead className='w-64'>Telefone</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead className='w-28'>Status</TableHead>
          <TableHead className='w-40 whitespace-nowrap'>
            Data de cadastro
          </TableHead>
          <TableHead className='w-20 text-center'>Ações</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isEmpty && (
          <TableRow>
            <TableEmptyCell colSpan={6}>
              Nenhum paciente encontrado
            </TableEmptyCell>
          </TableRow>
        )}

        {!isEmpty &&
          patients.map((patient) => {
            const status = PATIENT_STATUSES[patient.status]
            return (
              <TableRow key={patient.id}>
                <TableCell>
                  <TableLink
                    className='w-64'
                    href={ROUTES.dashboard.patients.details.info(patient.id)}
                  >
                    <Avatar className='size-9' src={patient.avatar_url} />
                    <span className='truncate'>{patient.name}</span>
                  </TableLink>
                </TableCell>
                <TableCell>{formatPhoneNumber(patient.phone)}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>
                  <Tag variant={status.variant} size='sm'>
                    {status.label}
                  </Tag>
                </TableCell>
                <TableCell>{formatDate(patient.created_at)}</TableCell>
                <TableCell className='text-center'>
                  <PatientsTableActions patient={patient} />
                </TableCell>
              </TableRow>
            )
          })}

        {loading &&
          skeletons.map((skeleton) => (
            <TableRow key={skeleton}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <Skeleton className='size-9 rounded-full' />
                  <Skeleton className='h-5 w-48 rounded-md' />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-32 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-56 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-6 w-18 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='h-5 w-24 rounded-md' />
              </TableCell>
              <TableCell>
                <Skeleton className='mx-auto size-9' />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
