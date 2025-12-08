'use client'

import { ArrowDownUp, ListFilterPlus, Search } from 'lucide-react'
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
    <div className='mb-4 flex flex-wrap items-center justify-between gap-2 text-[16px]'>
      <div className='flex gap-2 rounded-md bg-[#F6F8FA] p-2'>
        <Button
          size='sm'
          className={`px-3 py-1 text-[16px] ${statusFilter === 'all' ? 'bg-white text-black' : 'bg-transparent text-gray-700'} hover:text-white`}
          onClick={() => setStatusFilter('all')}
        >
          Todos
        </Button>

        <Button
          size='sm'
          className={`px-3 py-1 text-[16px] ${statusFilter === 'stable' ? 'bg-white text-black' : 'bg-transparent text-gray-700'} hover:text-white`}
          onClick={() => setStatusFilter('stable')}
        >
          Estável
        </Button>

        <Button
          size='sm'
          className={`px-3 py-1 text-[16px] ${statusFilter === 'crisis' ? 'bg-white text-black' : 'bg-transparent text-gray-700'} hover:text-white`}
          onClick={() => setStatusFilter('crisis')}
        >
          Em surto
        </Button>
      </div>

      <div className='flex gap-2'>
        <div className='relative'>
          <Search
            className='absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2'
            color='#868C98'
          />
          <Input
            placeholder='Pesquisar'
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className='w-52 pl-8 text-[16px]' // largura maior
          />
        </div>

        <div className='relative flex items-center'>
          <ListFilterPlus
            className='absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2'
            color='#868C98'
          />
          <Select
            placeholder='Filtro'
            value={categoryFilter}
            onValueChange={(v: string) =>
              setCategoryFilter(v as PatientHistoryCategory)
            }
            options={[
              { value: '', label: 'Filtro' },
              ...Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
                value,
                label,
              })),
            ]}
            className='w-36 pl-8 text-[16px]'
          />
        </div>

        <div className='relative flex items-center'>
          <ArrowDownUp
            className='absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2'
            color='#868C98'
          />
          <Select
            placeholder='Ordenar por'
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
            className='w-44 pl-8 text-[16px]'
          />
        </div>

        <Button
          variant='muted'
          size='sm'
          className='px-2 py-1 text-[16px]'
          onClick={clearFilters}
        >
          Limpar filtros
        </Button>
      </div>
    </div>
  )
}
