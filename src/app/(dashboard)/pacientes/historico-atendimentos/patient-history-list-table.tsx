'use client'

import { EyeIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

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

import type {
  PatientHistory,
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'
import PatientHistoryObservationsModal from './patient-history-observationsModal'
import PatientHistorySkeleton from './patient-history-skeleton'

interface Props {
  patientId: string
  filters: {
    searchName: string
    statusFilter: PatientHistoryStatus | 'all'
    categoryFilter: PatientHistoryCategory | ''
    sortOption: string
  }
}

const PATIENT_HISTORY_CATEGORY_LABELS: Record<PatientHistoryCategory, string> =
  {
    medicine: 'Medicina',
    lawyer: 'Advogado',
    nurse: 'Enfermeiro',
    psychologist: 'Psicólogo',
    nutritionist: 'Nutricionista',
    physical_trainer: 'Preparador físico',
    social_service: 'Serviço-social',
    psychiatry: 'Psiquiatria',
    neurologist: 'Neurologista',
    ophthalmologist: 'Oftalmologista',
  }

const PATIENT_HISTORY_STATUS_LABELS: Record<PatientHistoryStatus, string> = {
  stable: 'Estável',
  crisis: 'Em surto',
}

export const MOCK_HISTORY: PatientHistory[] = [
  {
    id: '1',
    patient_id: '1',
    date: '2025-11-01T10:30:00Z',
    professional_name: 'Dra. Ana Silva',
    category: 'medicine',
    status: 'stable',
    observations: 'Paciente apresentou melhora significativa.',
  },
  {
    id: '2',
    patient_id: '1',
    date: '2025-11-15T14:00:00Z',
    professional_name: 'Dr. Pedro Souza',
    category: 'nurse',
    status: 'crisis',
    observations: 'Exame de sangue solicitado.',
  },
  {
    id: '3',
    patient_id: '1',
    date: '2025-10-20T09:00:00Z',
    professional_name: 'Dra. Fernanda Lima',
    category: 'psychologist',
    status: 'stable',
    observations: 'Consulta psicológica sem complicações.',
  },
]

export default function PatientHistoryListTable({ patientId, filters }: Props) {
  const [history, setHistory] = useState<PatientHistory[]>([])
  const [selected, setSelected] = useState<PatientHistory | null>(null)
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    let filtered = MOCK_HISTORY

    if (filters.statusFilter !== 'all')
      filtered = filtered.filter((h) => h.status === filters.statusFilter)
    if (filters.categoryFilter)
      filtered = filtered.filter((h) => h.category === filters.categoryFilter)
    if (filters.searchName)
      filtered = filtered.filter((h) =>
        h.professional_name
          ?.toLowerCase()
          .includes(filters.searchName.toLowerCase()),
      )

    switch (filters.sortOption) {
      case 'date_asc':
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        )
        break
      case 'date_desc':
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )
        break
      case 'status_asc':
        filtered.sort((a, b) => a.status.localeCompare(b.status))
        break
      case 'status_desc':
        filtered.sort((a, b) => b.status.localeCompare(a.status))
        break
      case 'alpha_asc':
        filtered.sort((a, b) =>
          (a.professional_name ?? '').localeCompare(b.professional_name ?? ''),
        )
        break
      case 'alpha_desc':
        filtered.sort((a, b) =>
          (b.professional_name ?? '').localeCompare(a.professional_name ?? ''),
        )
        break
    }

    setHistory(filtered)
    setTotal(filtered.length)
    setLoading(false)
  }, [patientId, filters])

  return (
    <>
      <Card className='p-4'>
        {loading ? (
          <PatientHistorySkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-xs'>Data de atendimento</TableHead>
                <TableHead className='text-xs'>Profissional</TableHead>
                <TableHead className='text-xs'>Categoria</TableHead>
                <TableHead className='text-xs'>Status</TableHead>
                <TableHead className='text-center text-xs'>
                  Observações
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className='text-base'>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className='text-base'>
                    {item.professional_name ?? '-'}
                  </TableCell>
                  <TableCell className='text-base'>
                    <Tag>{PATIENT_HISTORY_CATEGORY_LABELS[item.category]}</Tag>
                  </TableCell>
                  <TableCell className='text-base'>
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
          </Table>
        )}
      </Card>

      <Pagination totalItems={total} />
      <PatientHistoryObservationsModal
        data={selected}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
