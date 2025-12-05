import { EyeIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

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
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'

import {
  PATIENT_HISTORY_CATEGORY_LABELS,
  PATIENT_HISTORY_STATUS_LABELS,
} from './patient-history.constants'
import type {
  PatientHistory,
  PatientHistoryOrder,
} from './patient-history.types'
import PatientHistoryObservationsModal from './patient-history-observationsModal'
import PatientHistorySkeleton from './patient-history-skeleton'

interface Props {
  patientId: string
}

export function PatientHistoryListTable({ patientId }: Props) {
  const [total, setTotal] = useState(0)
  const [selected, setSelected] = useState<PatientHistory | null>(null)
  const [history, setHistory] = useState<PatientHistory[]>([])
  const [loading, setLoading] = useState(false)
  const { getParam, updateParams } = useParams()

  const page = getParam('page')
  const orderBy = getParam('orderBy')
  const date = getParam('date')
  const startDate = getParam('startDate')
  const endDate = getParam('endDate')
  const categories = getParam('categories')
  const status = getParam('status')

  const ORDER_MAPPING: Record<
    PatientHistoryOrder,
    { orderBy: string; order: string }
  > = {
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    status_asc: { orderBy: 'status', order: 'ASC' },
    status_desc: { orderBy: 'status', order: 'DESC' },
  }

  const fetchHistory = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api<{ history: PatientHistory[]; total: number }>(
        `/patients/${patientId}/history`,
        {
          params: {
            page,
            date,
            startDate,
            endDate,
            categories,
            status,
            ...ORDER_MAPPING[(orderBy as PatientHistoryOrder) || 'date_desc'],
          },
        },
      )
      if (response.data) {
        setHistory(response.data.history)
        setTotal(response.data.total)
      }
    } finally {
      setLoading(false)
    }
  }, [patientId, page, orderBy, date, startDate, endDate, categories, status])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const handleClear = () => {
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
      <div className='mb-4 flex items-center justify-between'>
        <span>Total de atendimentos: {total}</span>
        <Button variant='outline' onClick={handleClear}>
          Limpar
        </Button>
      </div>

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

          {loading ? (
            <PatientHistorySkeleton />
          ) : (
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.professional_name || '-'}</TableCell>
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
