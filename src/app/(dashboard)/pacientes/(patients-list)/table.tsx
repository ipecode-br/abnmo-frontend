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
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { ROUTES } from '@/constants/routes'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { OrderMappingType } from '@/types/order'
import {
  PATIENT_STATUS,
  PATIENT_STATUS_OPTIONS,
  PATIENTS_ORDER_OPTIONS,
  type PatientsOrderType,
  type PatientType,
} from '@/types/patients'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

import { PatientsListTableActions } from './actions'
import PatientsListTableBodySkeleton from './skeleton'

export function PatientsListTable() {
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

  const ORDER_MAPPING: OrderMappingType<PatientsOrderType> = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    email_asc: { orderBy: 'email', order: 'ASC' },
    email_desc: { orderBy: 'email', order: 'DESC' },
    name_asc: { orderBy: 'name', order: 'ASC' },
    name_desc: { orderBy: 'name', order: 'DESC' },
  }

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.patients, filterQueries],
    queryFn: () =>
      api<{ patients: PatientType[]; total: number }>('/patients', {
        params: {
          page,
          search,
          status,
          startDate,
          endDate,
          ...ORDER_MAPPING[orderBy as PatientsOrderType],
        },
      }),
  })

  const patients = response?.data?.patients ?? []
  const isPatientsEmpty = patients.length === 0

  // Update stable total only when we have actual data to prevent pagination flickering
  useEffect(() => {
    if (response?.data?.total !== undefined) {
      setStableTotal(response.data.total)
    }
  }, [response?.data?.total])

  useEffect(() => {
    if (status || startDate || endDate) {
      setShowFilters(true)
    }
  }, [status, startDate, endDate])

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<Users2Icon />}
          total={stableTotal}
          title='Pacientes'
        />
        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar nome' />
          <DataTableHeaderOrderBy
            options={PATIENTS_ORDER_OPTIONS}
            className='w-52'
          />
          <DataTableHeaderFilterButton
            onClick={() => setShowFilters(!showFilters)}
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
              <TableHead className='w-44'>Telefone</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className='w-28'>Status</TableHead>
              <TableHead className='w-40 whitespace-nowrap'>
                Data de cadastro
              </TableHead>
              <TableHead className='w-20 text-center'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && <PatientsListTableBodySkeleton />}

          {!isLoading && isPatientsEmpty && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className='p-2 text-center'>
                    Nenhum paciente encontrado
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && !isPatientsEmpty && (
            <TableBody>
              {patients.map((patient) => {
                const status = PATIENT_STATUS[patient.status]
                return (
                  <TableRow key={patient.id}>
                    <TableCell className='py-0'>
                      <TableButton
                        className='w-64'
                        onClick={() =>
                          router.push(
                            ROUTES.dashboard.patients.details.info(patient.id),
                          )
                        }
                      >
                        <Avatar className='size-9' src={patient.avatar_url} />
                        <span className='truncate'>{patient.name}</span>
                      </TableButton>
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
