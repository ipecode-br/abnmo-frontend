'use client'

import { useState } from 'react'

import PatientsTable from '@/components/table-patients/PatientsTable'
import TableDashboard from '@/components/table-patients/TableDashboard'

export default function PatientsPage() {
  const [patientCount, setPatientCount] = useState<number>(0)
  const [sortBy, setSortBy] = useState<string>('Nome')
  const [search, setSearch] = useState<string>('')
  const [filters, setFilters] = useState<string[]>([])
  const [dateStart, setDateStart] = useState<string>('')
  const [dateEnd, setDateEnd] = useState<string>('')

  const handleSortChange = (sortField: string) => setSortBy(sortField)
  const handleCountUpdate = (count: number) => setPatientCount(count)
  const handleSearchChange = (searchValue: string) => setSearch(searchValue)

  return (
    <TableDashboard
      patientCount={patientCount}
      sortBy={sortBy}
      onSortChange={handleSortChange}
      onSearchChange={handleSearchChange}
      search={search}
      filters={filters}
      onFilterChange={setFilters}
      dateStart={dateStart}
      dateEnd={dateEnd}
      onDateStartChange={(date) => setDateStart(date)}
      onDateEndChange={(date) => setDateEnd(date)}
    >
      <PatientsTable
        onCountUpdate={handleCountUpdate}
        sortBy={sortBy}
        search={search}
        filters={filters}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />
    </TableDashboard>
  )
}
