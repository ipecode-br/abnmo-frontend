'use client'

import { Search, Users } from 'lucide-react'
import React, { ChangeEvent, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { FiBell } from 'react-icons/fi'
import { MdFilterList, MdHelpOutline } from 'react-icons/md'

import { ButtonNewPatient } from './ButtonNewPatient'
import { Filters } from './Filters'
import { OrderDropdown } from './OrderDropdown'

export type TableDashboardProps = {
  children: React.ReactNode
  patientCount: number
  sortBy: string
  onSortChange: (sortField: string) => void
  onSearchChange: (search: string) => void
  search: string
  filters: string[]
  onFilterChange: (statuses: string[]) => void
  dateStart: string
  dateEnd: string
  onDateStartChange: (date: string) => void
  onDateEndChange: (date: string) => void
}

export default function TableDashboard({
  children,
  patientCount,
  sortBy,
  onSortChange,
  onSearchChange,
  search,
  filters,
  onFilterChange,
  dateStart,
  dateEnd,
  onDateStartChange,
  onDateEndChange,
}: TableDashboardProps) {
  const [showFilters, setShowFilters] = useState(false)

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value)
  }

  return (
    <div className='bg-background-soft text-foreground min-h-screen'>
      <header className='container mx-auto grid grid-cols-[20rem_1fr] gap-4 px-8 pt-6'>
        <div className='col-span-2'>
          <div className='flex items-center justify-between border border-gray-200 bg-white px-6 py-4'>
            <div className='flex items-center gap-3'>
              <span className='text-base font-semibold'>Geral</span>
              <span className='text-gray-300'>|</span>
              <FaUserFriends className='text-gray-600' />
              <span className='text-sm font-medium'>Pacientes</span>
            </div>
            <div className='flex items-center gap-3'>
              <a
                href='#'
                className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100'
              >
                <MdHelpOutline size={20} className='text-gray-600' />
              </a>
              <a
                href='#'
                className='flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100'
              >
                <FiBell size={20} className='text-gray-600' />
              </a>
            </div>
          </div>

          <div className='border-x border-b border-gray-200 bg-white px-6 py-4'>
            <h1 className='text-sm font-semibold'>Lista de Pacientes</h1>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-8 pb-16'>
        <div className='mt-6 flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <div className='rounded-md bg-gray-200 p-1.5 text-gray-600'>
              <Users size={20} />
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-lg leading-none font-semibold'>
                {patientCount}
              </p>
              <span className='text-muted-foreground text-xs text-gray-500'>
                Pacientes cadastrados
              </span>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            <div className='relative w-48'>
              <Search
                className='absolute top-2.5 left-3 text-gray-400'
                size={16}
              />
              <input
                type='text'
                placeholder='Pesquisar nome...'
                value={search}
                onChange={handleSearchInputChange}
                className='w-full rounded border border-gray-300 py-1.5 pr-3 pl-8 text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none'
              />
            </div>

            <button
              className='flex items-center gap-1 rounded border border-gray-300 px-2 py-1.5 text-sm hover:bg-gray-100'
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <MdFilterList size={16} /> Filtros
            </button>

            <OrderDropdown sortBy={sortBy} onSortChange={onSortChange} />

            <ButtonNewPatient />
          </div>
        </div>

        {/* Aqui renderiza os filtros abaixo da barra */}
        {showFilters && (
          <div className='mt-4'>
            <Filters
              filters={filters}
              onFilterChange={onFilterChange}
              dateStart={dateStart}
              dateEnd={dateEnd}
              onDateStartChange={onDateStartChange}
              onDateEndChange={onDateEndChange}
            />
          </div>
        )}

        <section className='mt-6 rounded-md border border-gray-200 bg-white p-8 shadow-md'>
          {children}
        </section>
      </main>
    </div>
  )
}
