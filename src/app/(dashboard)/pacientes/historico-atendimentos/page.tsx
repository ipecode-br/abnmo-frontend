import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import PatientHistoryFilters from './patient-history-filters'
import { PatientHistoryListTable } from './patient-history-list-table'

interface PageProps {
  params: { id: string }
}

export default function Page({ params }: PageProps) {
  const patientId = params.id

  return (
    <main className='container mx-auto px-4 py-6'>
      <div className='mb-6 flex items-center gap-3'>
        <Link
          href='/pacientes'
          className='inline-flex items-center gap-2 rounded-md px-2 py-1 hover:underline'
        >
          <ArrowLeft className='h-4 w-4' />
          <span className='text-sm'>Voltar</span>
        </Link>

        <div>
          <h1 className='text-2xl font-semibold'>Histórico de atendimentos</h1>
          <p className='text-muted-foreground text-sm'>
            Visualize todos os atendimentos registrados para o paciente
          </p>
        </div>
      </div>

      <PatientHistoryFilters />
      <PatientHistoryListTable patientId={patientId} />
    </main>
  )
}
