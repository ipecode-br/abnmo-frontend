'use client'

import { EllipsisIcon, PlusIcon, Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'

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

export default function PatientsListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const patients = PATIENTS_MOCKS

  // Filtros
  const { getParam, searchParams } = useParams()
  const orderByValue = searchParams.get(QUERY_PARAMS.orderBy) || ''
  const searchQuery = getParam(QUERY_PARAMS.search)?.toLowerCase() || ''
  const statusFilter = getParam(QUERY_PARAMS.status) || ''
  const startDateStr = getParam(QUERY_PARAMS.startDate)
  const endDateStr = getParam(QUERY_PARAMS.endDate)

  const filteredPatients = useMemo(() => {
    const startDate = startDateStr ? new Date(startDateStr) : null
    const endDate = endDateStr ? new Date(endDateStr) : null

    let result = [...patients]

    // Filtro por busca
    if (searchQuery) {
      result = result.filter((patient) =>
        [patient.name, patient.email, patient.phone, patient.status]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery),
      )
    }

    // Filtro por status
    if (statusFilter) {
      result = result.filter((patient) => patient.status === statusFilter)
    }

    // Filtro por data
    if (startDate || endDate) {
      result = result.filter((patient) => {
        const created = new Date(patient.created_at)
        const afterStart = startDate ? created >= startDate : true
        const beforeEnd = endDate ? created <= endDate : true
        return afterStart && beforeEnd
      })
    }

    // Ordenação
    switch (orderByValue) {
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'date_asc':
        result.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
        break
      case 'date_desc':
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        break
      case 'email_asc':
        result.sort((a, b) => a.email.localeCompare(b.email))
        break
      case 'email_desc':
        result.sort((a, b) => b.email.localeCompare(a.email))
        break
    }

    return result
  }, [
    patients,
    searchQuery,
    statusFilter,
    startDateStr,
    endDateStr,
    orderByValue,
  ])

  const {
    search,
    orderBy,
    status,
    startDate: start,
    endDate: end,
  } = QUERY_PARAMS
  const filterQueries = [search, orderBy, status, start, end]

  function handleNavigation(id: string) {
    const routes = getRoutes(id)
    router.push(routes.dashboard.patients.details.info)
  }

  useEffect(() => {
    if (statusFilter || startDateStr || endDateStr) {
      setShowFilters(true)
    }
  }, [statusFilter, startDateStr, endDateStr, getParam])

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          total={filteredPatients.length}
          title='Pacientes cadastrados'
          emptyTitle='Nenhum paciente encontrado'
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
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className='py-4 text-center'>
                  Nenhum paciente encontrado
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient, index) => {
                const isLastRow = index === filteredPatients.length - 1
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
              })
            )}
          </TableBody>
        </Table>
      </Card>

      <Suspense>
        <Pagination totalItems={filteredPatients.length} />
      </Suspense>
    </>
  )
}
