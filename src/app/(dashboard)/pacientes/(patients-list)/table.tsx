'use client'

import { useQuery } from '@tanstack/react-query'
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
import { PATIENTS_MOCKS } from '@/utils/mock/patients'

// TODO: create patient actions menu
// TODO: redirect to register new patient page
// TODO: add focus styles to cell button
// TODO: add loading state to table
export default function PatientsListTable() {
  const [showFilters, setShowFilters] = useState(false)
  const { getParam } = useParams()
  const router = useRouter()

  const page = getParam(QUERY_PARAMS.page)
  const search = getParam(QUERY_PARAMS.search)
  const status = getParam(QUERY_PARAMS.status)
  const orderBy = getParam(QUERY_PARAMS.orderBy)
  const startDate = getParam(QUERY_PARAMS.startDate)
  const endDate = getParam(QUERY_PARAMS.endDate)
  const filterQueries = [page, search, orderBy, status, startDate, endDate]

  const { data: response } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.patients, filterQueries],
    queryFn: () =>
      api<{ patients: PatientType[]; total: number }>('/patients', {
        params: { page, search, orderBy, status, startDate, endDate },
      }),
  })

  const total = response?.data?.total ?? 0
  const patients = response?.data?.patients ?? []

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
                      onClick={() =>
                        router.push(
                          ROUTES.dashboard.patients.details.info(
                            patient.id.toString(),
                          ),
                        )
                      }
                    >
                      <div className='flex items-center gap-2'>
                        <Avatar
                          className='size-9'
                          src={patient.user.avatar_url}
                        />
                        {patient.user.name}
                      </div>
                    </button>
                  </TableCell>

                  <TableCell isLastRow={isLastRow}>
                    {formatPhoneNumber(patient.phone)}
                  </TableCell>
                  <TableCell isLastRow={isLastRow}>
                    {patient.user.email}
                  </TableCell>
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

      <Pagination totalItems={total} />
    </>
  )
}
