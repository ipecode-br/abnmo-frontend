'use client'

import { useQuery } from '@tanstack/react-query'
import { PlusIcon, Users2Icon } from 'lucide-react'
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
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { ROUTES } from '@/constants/routes'
import { STATUS_TAGS } from '@/constants/utils'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import {
  PATIENT_STATUS,
  PATIENT_STATUS_OPTIONS,
  PATIENTS_ORDER_OPTIONS,
  type PatientType,
} from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { PatientsListTableActions } from './actions'
import PatientsListTableBodySkeleton from './skeleton'

// TODO: redirect to register new patient page
export default function PatientsListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const [stableTotal, setStableTotal] = useState(0)
  const { getParam } = useParams()
  const router = useRouter()

  const page = getParam(QUERY_PARAMS.page)
  const search = getParam(QUERY_PARAMS.search)
  const status = getParam(QUERY_PARAMS.status)
  const orderBy = getParam(QUERY_PARAMS.orderBy)
  const startDate = getParam(QUERY_PARAMS.startDate)
  const endDate = getParam(QUERY_PARAMS.endDate)
  const filterQueries = [page, search, orderBy, status, startDate, endDate]

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.patients, filterQueries],
    queryFn: () =>
      api<{ patients: PatientType[]; total: number }>('/patients', {
        params: { page, search, orderBy, status, startDate, endDate },
      }),
  })

  const total = response?.data?.total ?? 0
  const patients = response?.data?.patients ?? []

  // Update stable total only when we have actual data to prevent pagination flickering
  useEffect(() => {
    if (response?.data?.total !== undefined) {
      setStableTotal(response.data.total)
    }
  }, [response?.data?.total])

  useEffect(() => {
    if (status || startDate || endDate) {
      setShowFilters(true)
    } else {
      setShowFilters(false)
    }
  }, [status, startDate, endDate])

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          total={total}
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
        <DataTableFilters
          queries={[
            QUERY_PARAMS.status,
            QUERY_PARAMS.startDate,
            QUERY_PARAMS.endDate,
          ]}
        >
          <DataTableFilterStatus options={PATIENT_STATUS_OPTIONS} />
          <DataTableFilterDate />
        </DataTableFilters>
      )}

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-64'>Nome do paciente</TableHead>
              <TableHead className='w-36'>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className='w-24'>Status</TableHead>
              <TableHead className='w-40 whitespace-nowrap'>
                Data de cadastro
              </TableHead>
              <TableHead className='w-20 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading ? (
            <PatientsListTableBodySkeleton />
          ) : (
            <TableBody>
              {patients.map((patient, index) => {
                const isLastRow = index === patients.length - 1
                const statusTag =
                  STATUS_TAGS[patient.status as keyof typeof STATUS_TAGS]
                const StatusIcon = statusTag.icon

                return (
                  <TableRow key={patient.id}>
                    <TableCell isLastRow={isLastRow} className='py-0'>
                      <button
                        className='focus-visible:ring-ring focus-visible:outline-background flex w-64 cursor-pointer items-center gap-2 rounded-lg focus-visible:ring-2 focus-visible:ring-offset-4'
                        onClick={() =>
                          router.push(
                            ROUTES.dashboard.patients.details.info(patient.id),
                          )
                        }
                      >
                        <Avatar className='size-9' src={patient.avatar_url} />
                        <span className='truncate'>{patient.name}</span>
                      </button>
                    </TableCell>

                    <TableCell isLastRow={isLastRow}>
                      {formatPhoneNumber(patient.phone)}
                    </TableCell>
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
                      <PatientsListTableActions patient={patient} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          )}
        </Table>
      </Card>

      <Pagination totalItems={stableTotal} />
    </>
  )
}
