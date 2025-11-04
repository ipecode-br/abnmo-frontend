import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleAlert, PlusIcon } from 'lucide-react'
import type { Metadata } from 'next'

import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InputSearch } from '@/components/ui/input-search'

export const metadata: Metadata = {
  title: 'Aprovações pendentes',
}
type RequirementType = {
  id: string
  name: string
  type: string
  approved_at: string
}

const approvalsPending: RequirementType[] = [
  { id: '1', name: 'Julius Menezes', type: 'laudo', approved_at: '2025-01-10' },
  {
    id: '2',
    name: 'Ana Paula Silva',
    type: 'primeiro cadastro',
    approved_at: '2025-01-12',
  },
  { id: '3', name: 'Carlos Alberto', type: 'laudo', approved_at: '2025-01-13' },
  {
    id: '4',
    name: 'Fernanda Torres',
    type: 'primeiro cadastro',
    approved_at: '2025-03-14',
  },
  { id: '5', name: 'Rafael Lima', type: 'laudo', approved_at: '2025-01-15' },
  {
    id: '6',
    name: 'Mariana Oliveira',
    type: 'primeiro cadastro',
    approved_at: '2025-05-16',
  },
  { id: '7', name: 'Pedro Henrique', type: 'laudo', approved_at: '2025-10-17' },
  {
    id: '8',
    name: 'Beatriz Santos',
    type: 'primeiro cadastro',
    approved_at: '2025-01-18',
  },
  { id: '9', name: 'Lucas Rocha', type: 'laudo', approved_at: '2025-11-03' },
  {
    id: '10',
    name: 'Isabela Ferreira',
    type: 'primeiro cadastro',
    approved_at: '2025-01-20',
  },
  {
    id: '11',
    name: 'Gustavo Pereira',
    type: 'laudo',
    approved_at: '2025-01-21',
  },
  {
    id: '12',
    name: 'Camila Costa',
    type: 'primeiro cadastro',
    approved_at: '2025-01-22',
  },
  {
    id: '13',
    name: 'Thiago Ribeiro',
    type: 'laudo',
    approved_at: '2025-01-23',
  },
  {
    id: '14',
    name: 'Larissa Almeida',
    type: 'primeiro cadastro',
    approved_at: '2025-01-24',
  },
  {
    id: '15',
    name: 'Vinícius Martins',
    type: 'laudo',
    approved_at: '2025-01-25',
  },
  {
    id: '16',
    name: 'Natália Gomes',
    type: 'primeiro cadastro',
    approved_at: '2025-01-26',
  },
  {
    id: '17',
    name: 'Eduardo Carvalho',
    type: 'laudo',
    approved_at: '2025-01-27',
  },
  {
    id: '18',
    name: 'Patrícia Mendes',
    type: 'primeiro cadastro',
    approved_at: '2025-01-28',
  },
  { id: '19', name: 'João Pedro', type: 'laudo', approved_at: '2025-01-29' },
  {
    id: '20',
    name: 'Sabrina Azevedo',
    type: 'primeiro cadastro',
    approved_at: '2025-01-30',
  },
]

export default function Page() {
  function formatReceivedDate(date: string) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    })
  }
  return (
    <div className='flex flex-col gap-6'>
      <section className='flex flex-col gap-2 sm:ml-auto sm:flex-row'>
        <InputSearch
          placeholder='Pesquisar nome...'
          className='w-full sm:w-auto'
        />
        <Button size='sm'>
          <PlusIcon />
          Adicionar solicitações
        </Button>
      </section>

      <Card className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {approvalsPending.map((person) => (
          <Card key={person.id} className='flex flex-col gap-2.5'>
            <div className='flex flex-col gap-1'>
              <span className='font-medium -tracking-tight'>{person.name}</span>
              <div className='flex items-center gap-1'>
                <CircleAlert className='text-primary size-4' />
                <span className='text-foreground-soft -tracking-tight'>{`Recebido ${formatReceivedDate(person.approved_at)}`}</span>
              </div>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <span className='font-medium -tracking-tight'>
                Tipo de solicitação:
              </span>
              <span className='bg-primary-soft/30 text-primary ml-2 rounded-lg px-2 py-0.5 text-sm capitalize'>
                {person.type}
              </span>
            </div>
          </Card>
        ))}
      </Card>

      <Pagination totalItems={approvalsPending.length} />
    </div>
  )
}
