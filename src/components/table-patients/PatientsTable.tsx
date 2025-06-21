'use client'

import { User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdCancel, MdCheckCircle } from 'react-icons/md'

import { patients as listPatientsMocs } from '@/constants/list-patients-mocs'

type Patient = {
  id: string
  namePatient: string
  entryDate: string
  contact: string
  email: string
  status: string
}

interface PatientsTableProps {
  onCountUpdate: (count: number) => void
  sortBy: string
  search: string
  filters: string[]
  dateStart: string
  dateEnd: string
}

const ITEMS_PER_PAGE = 10

export default function PatientsTable({
  onCountUpdate,
  sortBy,
  search,
  filters,
}: PatientsTableProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    try {
      setPatients(listPatientsMocs)
      setLoading(false)
    } catch {
      setError('Erro ao carregar pacientes')
      setLoading(false)
    }
  }, [])

  const filteredPatients = patients
    .filter((patient) =>
      patient.namePatient.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((patient) =>
      filters.length > 0 ? filters.includes(patient.status) : true,
    )

  useEffect(() => {
    if (onCountUpdate) {
      onCountUpdate(filteredPatients.length)
    }
    setCurrentPage(1)
  }, [filteredPatients.length, onCountUpdate])

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch (sortBy) {
      case 'Nome':
        return a.namePatient.localeCompare(b.namePatient)
      case 'Data de Entrada':
        return a.entryDate.localeCompare(b.entryDate)
      case 'Contato':
        return a.contact.localeCompare(b.contact)
      case 'Email':
        return a.email.localeCompare(b.email)
      case 'Status':
        return a.status.localeCompare(b.status)
      default:
        return 0
    }
  })

  const totalPages = Math.ceil(filteredPatients.length / ITEMS_PER_PAGE)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPatients = sortedPatients.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  if (loading)
    return (
      <p className='text-muted-foreground text-sm'>Carregando pacientes...</p>
    )
  if (error) return <p className='text-sm text-red-500'>Erro: {error}</p>

  const showingCount = paginatedPatients.length
  const totalCount = filteredPatients.length

  // Função para renderizar os botões numerados das páginas
  function renderPaginationButtons() {
    const buttons = []

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`rounded border border-gray-300 px-3 py-1 ${
            currentPage === i
              ? 'bg-green-700 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setCurrentPage(i)}
          aria-current={currentPage === i ? 'page' : undefined}
          aria-label={`Página ${i}`}
        >
          {i}
        </button>,
      )
    }
    return buttons
  }

  return (
    <>
      <div className='overflow-x-auto'>
        <table className='min-w-full border-separate border-spacing-y-0 text-center align-middle text-sm'>
          <thead>
            <tr className='bg-transparent text-gray-400'>
              <th className='rounded-tl-xl rounded-bl-xl border-t border-b border-l border-gray-300 px-4 py-3 text-center font-normal'>
                Nome do paciente
              </th>
              <th className='border-t border-b border-gray-300 px-4 py-3 text-center font-normal'>
                Data de Entrada
              </th>
              <th className='border-t border-b border-gray-300 px-4 py-3 text-center font-normal'>
                Contato
              </th>
              <th className='border-t border-b border-gray-300 px-4 py-3 text-center font-normal'>
                Email
              </th>
              <th className='border-t border-b border-gray-300 px-4 py-3 text-center font-normal'>
                Status
              </th>
              <th className='rounded-tr-xl rounded-br-xl border-t border-r border-b border-gray-300 px-4 py-3 text-center font-normal'>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className='h-6' />
            </tr>
            {paginatedPatients.map((patient) => (
              <tr key={patient.id} className='hover:bg-muted transition-colors'>
                <td className='flex items-center gap-3 border-b border-gray-200 px-4 py-3 text-left'>
                  <User
                    size={28}
                    className='rounded-full border border-gray-200 p-1.5 text-gray-700'
                  />
                  {patient.namePatient}
                </td>
                <td className='border-b border-gray-200 px-4 py-3'>
                  {patient.entryDate}
                </td>
                <td className='border-b border-gray-200 px-4 py-3'>
                  {patient.contact}
                </td>
                <td className='border-b border-gray-200 px-4 py-3'>
                  {patient.email}
                </td>
                <td className='flex items-center justify-center gap-1 border-b border-gray-200 px-4 py-3'>
                  {patient.status === 'Ativo' && (
                    <MdCheckCircle className='text-green-600' size={12} />
                  )}
                  {patient.status === 'Inativo' && (
                    <MdCancel className='text-red-600' size={12} />
                  )}
                  <span>{patient.status}</span>
                </td>
                <td className='border-b border-gray-200 px-4 py-3'>
                  <button
                    className='text-gray-600 transition-colors hover:text-gray-800'
                    onClick={() =>
                      alert(`Mais opções para ${patient.namePatient}`)
                    }
                    title='Mais opções'
                    aria-label={`Mais opções para ${patient.namePatient}`}
                  >
                    <BsThreeDotsVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contagem */}
      <p className='mt-2 text-sm text-gray-600'>
        Mostrando {showingCount} de {totalCount} pacientes
      </p>

      {/* Paginação com botões numerados */}
      <div className='mt-3 flex flex-wrap justify-center gap-2'>
        {renderPaginationButtons()}
      </div>
    </>
  )
}
