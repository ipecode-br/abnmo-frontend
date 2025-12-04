'use client'

import { useQuery } from '@tanstack/react-query'
import { EyeIcon, HistoryIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderInfo } from '@/components/data-table/header/info'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
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
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { OrderMapping } from '@/types/order'
import { formatDate } from '@/utils/formatters/format-date'

import {
  PATIENT_HISTORY_CATEGORY_LABELS,
  PATIENT_HISTORY_ORDER_OPTIONS,
  PATIENT_HISTORY_STATUS_LABELS,
} from './patient-history.constants'
import { PatientHistory, PatientHistoryOrder } from './patient-history.types'
import PatientHistoryFilters from './patient-history-filters'
import PatientHistoryObservationsModal from './patient-history-observations'
import PatientHistorySkeleton from './patient-history-skeleton'

export function PatientHistoryListTable({ patientId }: { patientId: string }) {
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<PatientHistory | null>(null)

  const { getParam, updateParams } = useParams()

  const page = getParam(QUERY_PARAMS.page)
  const orderBy = getParam(QUERY_PARAMS.orderBy)

  const date = getParam('date')
  const startDate = getParam('startDate')
  const endDate = getParam('endDate')
  const categories = getParam('categories')
  const status = getParam('status')

  const ORDER_MAPPING: OrderMapping<PatientHistoryOrder> = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    status_asc: { orderBy: 'status', order: 'ASC' },
    status_desc: { orderBy: 'status', order: 'DESC' },
  }

  const orderByQuery = ORDER_MAPPING[orderBy as PatientHistoryOrder] ?? {
    orderBy: 'date',
    order: 'DESC',
  }

  const { data: response, isLoading } = useQuery({
    queryKey: [
      QUERY_CACHE_KEYS.patients.list,
      patientId,
      page,
      orderByQuery,
      date,
      startDate,
      endDate,
      categories,
      status,
    ],
    queryFn: () =>
      api<{ history: PatientHistory[]; total: number }>(
        `/patients/${patientId}/history`,
        {
          params: {
            page,
            date,
            startDate,
            endDate,
            categories,
            status,
            ...orderByQuery,
          },
        },
      ),
  })

  const history = response?.data?.history ?? []

  useEffect(() => {
    if (response?.data) {
      setTotal(response.data.total)
    }
  }, [response?.data])

  const handleClearParams = () => {
    updateParams({
      remove: [
        'page',
        'orderBy',
        'date',
        'startDate',
        'endDate',
        'categories',
        'status',
      ],
    })
  }

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderInfo
          icon={<HistoryIcon />}
          total={total}
          title='Histórico'
        />

        <DataTableHeaderActions>
          <PatientHistoryFilters />

          <DataTableHeaderOrderBy
            options={PATIENT_HISTORY_ORDER_OPTIONS}
            className='w-60'
          />

          <Button variant='outline' onClick={handleClearParams}>
            Limpar
          </Button>
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Profissional</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Quadro</TableHead>
              <TableHead className='text-center'>Obs</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && <PatientHistorySkeleton />}

          {!isLoading && (
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.date)}</TableCell>

                  <TableCell>{item.professional_name ?? '-'}</TableCell>

                  <TableCell>
                    <Tag>{PATIENT_HISTORY_CATEGORY_LABELS[item.category]}</Tag>
                  </TableCell>

                  <TableCell>
                    <Tag>{PATIENT_HISTORY_STATUS_LABELS[item.status]}</Tag>
                  </TableCell>

                  <TableCell className='text-center'>
                    <Button
                      size='icon'
                      variant='ghost'
                      onClick={() => setSelected(item)}
                    >
                      <EyeIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Card>

      <Pagination totalItems={total} />

      <PatientHistoryObservationsModal
        data={selected}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
