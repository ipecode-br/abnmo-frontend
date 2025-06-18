import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'

export type ButtonClearFiltersProps = {
  onClick: () => void
}

export function ButtonClearFilters({ onClick }: ButtonClearFiltersProps) {
  return (
    <button
      className='text-md flex h-8 items-center gap-1 rounded border border-gray-300 px-2 py-1 text-gray-500 hover:bg-gray-100'
      onClick={onClick}
    >
      <MdDeleteOutline size={20} />
    </button>
  )
}
