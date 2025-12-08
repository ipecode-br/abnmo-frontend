'use client'

import { AlertTriangle, Eye, Flag } from 'lucide-react'
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

import type {
  PatientHistory,
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'
import PatientHistoryObservationsModal from './patient-history-observations-modal'
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

const CATEGORY_LABELS: Record<PatientHistoryCategory, string> = {
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

const STATUS_LABELS: Record<PatientHistoryStatus, string> = {
  stable: 'Estável',
  crisis: 'Em surto',
}

const STATUS_STYLES: Record<
  PatientHistoryStatus,
  { bg: string; color: string }
> = {
  stable: { bg: '#EFEFEF', color: '#000' },
  crisis: { bg: '#FEF3EB', color: '#F17B2C' },
}

// Mock de histórico
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
    let filtered = MOCK_HISTORY.filter(
      (h) => String(h.patient_id) === patientId,
    )
    if (filters.statusFilter !== 'all')
      filtered = filtered.filter((h) => h.status === filters.statusFilter)
    if (filters.categoryFilter)
      filtered = filtered.filter((h) => h.category === filters.categoryFilter)
    if (filters.searchName)
      filtered = filtered.filter((h) =>
        (h.professional_name ?? '')
          .toLowerCase()
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
      <div className='mb-4 h-[1px] w-full bg-[#FCFCFC]' />
      <Card className='p-4 text-[16px]'>
        {loading ? (
          <PatientHistorySkeleton />
        ) : (
          <Table className='text-[16px]'>
            <TableHeader>
              <TableRow>
                <TableHead>Data de atendimento</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Especialidade</TableHead>
                <TableHead className='text-center'>Quadro Geral</TableHead>
                <TableHead className='text-center'>Observações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => {
                const style = STATUS_STYLES[item.status]
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{item.professional_name ?? '-'}</TableCell>
                    <TableCell>{CATEGORY_LABELS[item.category]}</TableCell>
                    <TableCell className='text-center'>
                      <div
                        className='mx-auto flex w-fit items-center justify-center gap-1 rounded-md px-2 py-[2px]'
                        style={{ backgroundColor: style.bg }}
                      >
                        {item.status === 'stable' && (
                          <Flag size={16} color={style.color} />
                        )}
                        {item.status === 'crisis' && (
                          <AlertTriangle size={16} color={style.color} />
                        )}
                        <span style={{ color: style.color }}>
                          {STATUS_LABELS[item.status]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-center'>
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={() => setSelected(item)}
                      >
                        <Eye size={16} color='#868C98' />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
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
