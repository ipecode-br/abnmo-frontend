'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

import type {
  PatientHistoryCategory,
  PatientHistoryStatus,
} from './patient-history.types'

interface Props {
  onFilterChange?: (filters: {
    searchName: string
    statusFilter: PatientHistoryStatus | 'all'
    categoryFilter: PatientHistoryCategory | ''
    sortOption: string
  }) => void
}

export function PatientHistoryFilters({ onFilterChange }: Props) {
  const [searchName, setSearchName] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    PatientHistoryStatus | 'all'
  >('all')
  const [categoryFilter, setCategoryFilter] = useState<
    PatientHistoryCategory | ''
  >('')
  const [sortOption, setSortOption] = useState('')

  useEffect(() => {
    onFilterChange?.({ searchName, statusFilter, categoryFilter, sortOption })
  }, [searchName, statusFilter, categoryFilter, sortOption, onFilterChange])

  function clearFilters() {
    setSearchName('')
    setStatusFilter('all')
    setCategoryFilter('')
    setSortOption('')
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

  return (
    <div className='mb-4 flex flex-wrap items-center justify-between gap-2 text-xs'>
      <div className='flex gap-2'>
        <Button
          variant={statusFilter === 'all' ? 'default' : 'outline'}
          size='sm'
          className='px-2 py-1 text-xs'
          onClick={() => setStatusFilter('all')}
        >
          Todos
        </Button>
        <Button
          variant={statusFilter === 'stable' ? 'default' : 'outline'}
          size='sm'
          className='px-2 py-1 text-xs'
          onClick={() => setStatusFilter('stable')}
        >
          Estável
        </Button>
        <Button
          variant={statusFilter === 'crisis' ? 'default' : 'outline'}
          size='sm'
          className='px-2 py-1 text-xs'
          onClick={() => setStatusFilter('crisis')}
        >
          Em surto
        </Button>
      </div>

      <div className='flex gap-2'>
        <Input
          placeholder='Pesquisar'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className='w-36 text-xs'
        />

        <Select
          placeholder='Categoria'
          value={categoryFilter}
          onValueChange={(v: string) =>
            setCategoryFilter(v as PatientHistoryCategory)
          }
          options={[
            { value: '', label: 'Categoria' },
            ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
              value,
              label,
            })),
          ]}
          className='w-36 text-xs'
        />

        <Select
          placeholder='Ordenar'
          value={sortOption}
          onValueChange={(v: string) => setSortOption(v)}
          options={[
            { value: 'date_desc', label: 'Mais recente → Mais antigo' },
            { value: 'date_asc', label: 'Mais antigo → Mais recente' },
            { value: 'status_asc', label: 'Estável' },
            { value: 'status_desc', label: 'Em surto' },
            { value: 'alpha_asc', label: 'A-Z' },
            { value: 'alpha_desc', label: 'Z-A' },
          ]}
          className='w-36 text-xs'
        />

        <Button
          variant='muted'
          size='sm'
          className='px-2 py-1 text-xs'
          onClick={clearFilters}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}
