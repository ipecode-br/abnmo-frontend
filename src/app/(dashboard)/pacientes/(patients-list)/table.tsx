'use client'

import { EllipsisIcon, PlusIcon, Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DataTableFilters } from '@/components/data-table/filters'
import { DataTableFilterDate } from '@/components/data-table/filters/date'
import { DataTableFilterStatus } from '@/components/data-table/filters/status'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderFilterButton } from '@/components/data-table/header/filter-button'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
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
import { Tag } from '@/components/ui/tag'
import { QUERY_PARAMS } from '@/constants/params'
import { getRoutes } from '@/constants/routes'
import { STATUS_TAGS } from '@/constants/utils'
import { useParams } from '@/hooks/params'
import {
  PATIENT_STATUS,
  PATIENT_STATUS_OPTIONS,
  PATIENTS_ORDER_OPTIONS,
} from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

// TODO: implement Tanstack Query to fetch data from API
// TODO: create patient actions menu
// TODO: include new patient dialog
// TODO: add focus styles to cell button
export default function PatientsListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const { getParam } = useParams()
  const router = useRouter()

  const patients = PATIENTS_MOCKS
  const { search, orderBy, status, startDate, endDate } = QUERY_PARAMS
  const filterQueries = [search, orderBy, status, startDate, endDate]

  function handleNavigation(id: string) {
    const routes = getRoutes(id)
    router.push(routes.dashboard.patients.details.info)
  }

  useEffect(() => {
    const statusParam = getParam(status)

    if (statusParam) {
      setShowFilters(true)
    }
  }, [getParam, status])

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
          <DataTableHeaderOrderBy
            options={PATIENTS_ORDER_OPTIONS}
            className='min-w-48'
          />

          <Button size='sm'>
            <PlusIcon />
            Novo paciente
          </Button>
        </DataTableHeaderActions>
      </DataTableHeader>

      {showFilters && (
        <DataTableFilters queries={filterQueries}>
          <DataTableFilterStatus options={PATIENT_STATUS_OPTIONS} />
          <DataTableFilterDate />
        </DataTableFilters>
      )}

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do paciente</TableHead>
              <TableHead className='w-36'>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className='w-24'>Status</TableHead>
              <TableHead className='w-40 whitespace-nowrap'>
                Data de cadastro
              </TableHead>
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
                  <TableCell isLastRow={isLastRow} className='p-0'>
                    <button
                      className='cursor-pointer px-4'
                      onClick={() => handleNavigation(patient.id.toString())}
                    >
                      <div className='flex items-center gap-2'>
                        <Avatar className='size-9' />
                        {patient.name}
                      </div>
                    </button>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>{patient.phone}</TableCell>
                  <TableCell isLastRow={isLastRow}>{patient.email}</TableCell>
                  <TableCell isLastRow={isLastRow}>
                    <Tag className={statusTag.class}>
                      <StatusIcon />
                      {PATIENT_STATUS[patient.status]}
                    </Tag>
                  </TableCell>
                  <TableCell isLastRow={isLastRow}>
                    {formatDate(patient.created_at)}
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

      <Pagination totalItems={patients.length} />
    </>
  )
}
