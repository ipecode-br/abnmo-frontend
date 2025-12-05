'use client'

import { useMemo, useState } from 'react'

import { Avatar } from '@/components/ui/avatar'

import type {
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'
import { PatientHistoryFilters } from './patient-history-filters'
import PatientHistoryListTable, {
  MOCK_HISTORY,
} from './patient-history-list-table'

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  const patientId = params.id

  const [filters, setFilters] = useState<{
    searchName: string
    statusFilter: 'all' | PatientHistoryStatus
    categoryFilter: '' | PatientHistoryCategory
    sortOption: string
  }>({
    searchName: '',
    statusFilter: 'all',
    categoryFilter: '',
    sortOption: 'date_desc',
  })

  const profileName = 'Sonia Amorim'

  const totalAttendances = useMemo(() => {
    return MOCK_HISTORY.filter((h) => h.patient_id === patientId).length
  }, [patientId])

  return (
    <main className='container mx-auto px-4 py-6'>
      <div className='mb-6 flex flex-col gap-3'>
        <div>
          <h1 className='text-sm font-normal'>Histórico do paciente</h1>
        </div>

        <div className='flex flex-col'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-10 w-10 text-sm'>{profileName[0]}</Avatar>
            <span className='text-sm font-medium'>{profileName}</span>
          </div>

          <span className='text-muted-foreground mt-1 text-xs'>
            {totalAttendances} atendimentos realizados
          </span>
        </div>
      </div>

      <PatientHistoryFilters onFilterChange={setFilters} />

      <PatientHistoryListTable patientId={patientId} filters={filters} />
    </main>
  )
}
