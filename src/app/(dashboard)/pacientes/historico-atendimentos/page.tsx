import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Card } from '@/components/ui/card'

import { PatientHistoryListTable } from './patient-history-list-table'

interface PageProps {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Histórico de atendimentos',
}

export default function Page({ params }: PageProps) {
  const patientId = params.id

  return (
    <main className='container mx-auto px-4 py-6'>
      <div className='mb-6 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3'>
          <Link
            href='/pacientes'
            className='inline-flex items-center gap-2 rounded-md px-2 py-1 hover:underline'
            aria-label='Voltar para pacientes'
          >
            <ArrowLeft className='h-4 w-4' />
            <span className='text-sm'>Voltar</span>
          </Link>

          <div>
            <h1 className='text-2xl font-semibold'>
              Histórico de atendimentos
            </h1>
            <p className='text-muted-foreground text-sm'>
              Visualize todos os atendimentos registrados para o paciente
            </p>
          </div>
        </div>
      </div>

      <Card className='p-4'>
        <PatientHistoryListTable patientId={patientId} />
      </Card>
    </main>
  )
}
