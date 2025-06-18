'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  MdArrowDropDown,
  MdCalendarToday,
  MdCancel,
  MdCheckCircle,
} from 'react-icons/md'

import { ButtonClearFilters } from './ButtonClearFilters'

type FiltersProps = {
  filters: string[]
  onFilterChange: (statuses: string[]) => void
  dateStart: string
  dateEnd: string
  onDateStartChange: (date: string) => void
  onDateEndChange: (date: string) => void
}

export function Filters({
  filters,
  onFilterChange,
  dateStart,
  dateEnd,
  onDateStartChange,
  onDateEndChange,
}: FiltersProps) {
  const statusOptions = [
    {
      label: 'Ativo',
      icon: <MdCheckCircle className='text-green-600' size={14} />,
    },
    { label: 'Inativo', icon: <MdCancel className='text-red-600' size={14} /> },
  ]

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(filters[0] || '')

  const buttonRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const dateStartRef = useRef<HTMLInputElement>(null)
  const dateEndRef = useRef<HTMLInputElement>(null)

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !listRef.current?.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  function handleSelectStatus(status: string) {
    setSelectedStatus(status)
    onFilterChange(status ? [status] : [])
    setDropdownOpen(false)
  }

  function clearStatus() {
    setSelectedStatus('')
    onFilterChange([])
  }

  function clearDates() {
    onDateStartChange('')
    onDateEndChange('')
  }

  return (
    <div className='flex w-full flex-col space-y-4 md:flex-row md:items-end md:space-y-0 md:space-x-8'>
      {/* Status */}
      <div className='relative flex w-full flex-col md:w-64'>
        <label
          htmlFor='status-select'
          className='mb-1 cursor-pointer text-sm font-medium text-gray-800'
        >
          Status
        </label>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            ref={buttonRef}
            id='status-select'
            aria-haspopup='listbox'
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((v) => !v)}
            className='flex h-8 w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm'
          >
            <div className='flex items-center gap-2'>
              {selectedStatus === 'Ativo' && (
                <MdCheckCircle className='text-green-600' size={14} />
              )}
              {selectedStatus === 'Inativo' && (
                <MdCancel className='text-red-600' size={14} />
              )}
              <span
                className={selectedStatus ? 'text-gray-700' : 'text-gray-400'}
              >
                {selectedStatus || 'Selecione o status'}
              </span>
            </div>
            <MdArrowDropDown className='text-gray-400' size={24} />
          </button>

          <div className='flex h-8 items-center'>
            <ButtonClearFilters onClick={clearStatus} />
          </div>
        </div>

        {dropdownOpen && (
          <ul
            ref={listRef}
            role='listbox'
            tabIndex={-1}
            aria-labelledby='status-select'
            className='absolute top-full left-0 z-20 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-sm shadow-lg'
          >
            {statusOptions.map(({ label, icon }) => (
              <li
                key={label}
                role='option'
                aria-selected={selectedStatus === label}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 select-none ${
                  selectedStatus === label
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => handleSelectStatus(label)}
              >
                {icon}
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filtro de Datas */}
      <div className='flex flex-wrap items-end gap-4'>
        {/* Data Inicial */}
        <div className='flex flex-col'>
          <label
            htmlFor='dateStart'
            className='mb-1 cursor-pointer text-sm font-medium text-gray-800'
          >
            Data Inicial
          </label>
          <div className='relative w-40 cursor-pointer'>
            <input
              id='dateStart'
              type='date'
              ref={dateStartRef}
              value={dateStart}
              onChange={(e) => onDateStartChange(e.target.value)}
              className='absolute inset-0 z-10 h-6 w-full cursor-pointer opacity-0'
            />
            <div
              className='flex h-8 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-400 uppercase'
              onClick={() =>
                dateStartRef.current?.showPicker
                  ? dateStartRef.current.showPicker()
                  : dateStartRef.current?.focus()
              }
            >
              <span>{dateStart ? formatDate(dateStart) : 'DD/MM/YYYY'}</span>
              <MdCalendarToday className='text-gray-400' size={18} />
            </div>
          </div>
        </div>

        {/* Data Final */}
        <div className='flex flex-col'>
          <label
            htmlFor='dateEnd'
            className='mb-1 cursor-pointer text-sm font-medium text-gray-800'
          >
            Data Final
          </label>
          <div className='relative w-40 cursor-pointer'>
            <input
              id='dateEnd'
              type='date'
              ref={dateEndRef}
              value={dateEnd}
              onChange={(e) => onDateEndChange(e.target.value)}
              className='absolute inset-0 z-10 h-6 w-full cursor-pointer opacity-0'
            />
            <div
              className='flex h-8 items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-400 uppercase'
              onClick={() =>
                dateEndRef.current?.showPicker
                  ? dateEndRef.current.showPicker()
                  : dateEndRef.current?.focus()
              }
            >
              <span>{dateEnd ? formatDate(dateEnd) : 'DD/MM/YYYY'}</span>
              <MdCalendarToday className='text-gray-400' size={18} />
            </div>
          </div>
        </div>

        {/* Botão limpar datas */}
        <div className='flex h-8 items-center'>
          <ButtonClearFilters onClick={clearDates} />
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}
