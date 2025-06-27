'use client'

import { EllipsisIcon, PlusIcon, UserIcon, Users2Icon } from 'lucide-react'
import { Suspense, useState } from 'react'

import { DataTableFilters } from '@/components/data-table/filters'
import { DataTableFilterDate } from '@/components/data-table/filters/date'
import { DataTableFilterStatus } from '@/components/data-table/filters/status'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderOrder } from '@/components/data-table/header/order'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
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
import { Tag } from '@/components/ui/tag'
import { STATUS_TAGS } from '@/constants/utils'
import { convertObjectToOptions } from '@/helpers/convert-object-to-options'
import { PATIENT_STATUS, PATIENTS_ORDER } from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

// TODO: implement Tanstack Query to fetch data from API
// TODO: create patient actions menu
// TODO: include new patient dialog
export default function PatientsListTable() {
  const [showFilters, setShowFilters] = useState(false)

  const patients = PATIENTS_MOCKS
  const orderOptions = convertObjectToOptions(PATIENTS_ORDER)
  const statusOptions = convertObjectToOptions(PATIENT_STATUS)

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          total={60}
          title='Pacientes cadastrados'
          emptyTitle='Nenhum paciente cadastrado'
        />
        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar nome...' />
          <DataTableHeaderFilterButton
            onClick={() => setShowFilters(!showFilters)}
          />
          <DataTableHeaderOrder options={orderOptions} className='min-w-48' />

          <Button size='sm'>
            <PlusIcon />
            Novo paciente
          </Button>
        </DataTableHeaderActions>
      </DataTableHeader>

      {showFilters && (
        <DataTableFilters>
          <DataTableFilterStatus statusOptions={statusOptions} />
          <DataTableFilterDate />
        </DataTableFilters>
      )}

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do paciente</TableHead>
              <TableHead className='w-40'>Data de cadastro</TableHead>
              <TableHead className='w-36'>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className='w-24'>Status</TableHead>
              <TableHead className='w-20 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient, index) => {
              const isLastRow = index === PATIENTS_MOCKS.length - 1
              const statusTag = STATUS_TAGS[patient.status]
              const StatusIcon = statusTag.icon
              return (
                <TableRow key={patient.id}>
                  <TableCell isLastRow={isLastRow}>
                    <div className='flex items-center gap-2'>
                      <div className='border-border rounded-full border p-1.5'>
                        <UserIcon className='text-disabled size-5' />
                      </div>
                      {patient.name}
                    </div>
                  </TableCell>
                  <TableCell isLastRow={isLastRow}>
                    {formatDate(patient.created_at)}
                  </TableCell>
                  <TableCell isLastRow={isLastRow}>{patient.phone}</TableCell>
                  <TableCell isLastRow={isLastRow}>{patient.email}</TableCell>
                  <TableCell isLastRow={isLastRow}>
                    <Tag className={statusTag.class}>
                      <StatusIcon />
                      {PATIENT_STATUS[patient.status]}
                    </Tag>
                  </TableCell>
                  <TableCell isLastRow={isLastRow} className='text-center'>
                    <Button variant='ghost' size='icon' className='size-8'>
                      <EllipsisIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      <Suspense>
        <Pagination totalItems={patients.length} />
      </Suspense>
    </>
  )
}
