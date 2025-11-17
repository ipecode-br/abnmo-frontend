'use client'
import { Eye } from 'lucide-react'
import { useState } from 'react'

import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderOrderBy } from '@/components/data-table/header/order-by'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { AppointmentConditionTag } from '@/components/tags/appointment-condition'
import { Card } from '@/components/ui/card'
import { TabSelect } from '@/components/ui/tab-select'
import {
  Table,
  TableBody,
  TableButton,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  PatientConditionType,
  PATIENTS_REFERRALS_ORDER_OPTIONS,
} from '@/types/patients'

import ReferralsSkeleton from './referrals-skeleton'

const referrals = [
  {
    id: 1,
    nome: 'Ana Silva',
    encaminhadoEm: '03/03/2025',
    profissional: 'João Pereira',
    especialidade: 'Medicina',
    quadroGeral: 'stable',
  },
  {
    id: 2,
    nome: 'Carlos Mendes',
    encaminhadoEm: '03/03/2025',
    profissional: 'Mariana Costa',
    especialidade: 'Psicologia',
    quadroGeral: 'outbreak',
  },
  {
    id: 3,
    nome: 'Beatriz Rocha',
    encaminhadoEm: '03/03/2025',
    profissional: 'Lucas Andrade',
    especialidade: 'Nutrição',
    quadroGeral: 'stable',
  },
  {
    id: 4,
    nome: 'Rafael Gomes',
    encaminhadoEm: '03/03/2025',
    profissional: 'Fernanda Lima',
    especialidade: 'Enfermagem',
    quadroGeral: 'outbreak',
  },
  {
    id: 5,
    nome: 'Juliana Santos',
    encaminhadoEm: '03/03/2025',
    profissional: 'Pedro Albuquerque',
    especialidade: 'Advocacia',
    quadroGeral: 'stable',
  },
  {
    id: 6,
    nome: 'Marcos Oliveira',
    encaminhadoEm: '03/03/2025',
    profissional: 'Camila Duarte',
    especialidade: 'Medicina',
    quadroGeral: 'stable',
  },
  {
    id: 7,
    nome: 'Paula Ferreira',
    encaminhadoEm: '03/03/2025',
    profissional: 'Ricardo Matos',
    especialidade: 'Psicologia',
    quadroGeral: 'outbreak',
  },
  {
    id: 8,
    nome: 'Daniel Azevedo',
    encaminhadoEm: '03/03/2025',
    profissional: 'Larissa Pires',
    especialidade: 'Nutrição',
    quadroGeral: 'stable',
  },
  {
    id: 9,
    nome: 'Gabriela Martins',
    encaminhadoEm: '03/03/2025',
    profissional: 'Diego Amaral',
    especialidade: 'Enfermagem',
    quadroGeral: 'outbreak',
  },
  {
    id: 10,
    nome: 'Vitor Souza',
    encaminhadoEm: '03/03/2025',
    profissional: 'Letícia Moura',
    especialidade: 'Psicologia',
    quadroGeral: 'stable',
  },
]

export function ReferralsTable() {
  const [isLoading] = useState(false)
  const [isReferralsEmpty] = useState<boolean>(referrals.length <= 0)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filterOptions = [
    {
      label: 'Todos',
      isActive: statusFilter === 'all',
      onClick: () => setStatusFilter('all'),
    },
    {
      label: 'Em surto',
      isActive: statusFilter === 'outbreak',
      onClick: () => setStatusFilter('outbreak'),
    },
    {
      label: 'Estável',
      isActive: statusFilter === 'stable',
      onClick: () => setStatusFilter('stable'),
    },
  ]

  return (
    <div className='space-y-6'>
      <DataTableHeader>
        <TabSelect buttons={filterOptions} />
        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar' />
          <DataTableHeaderOrderBy options={PATIENTS_REFERRALS_ORDER_OPTIONS} />
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='p-6'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome do paciente</TableHead>
              <TableHead>Encaminhado em</TableHead>
              <TableHead>Profissional</TableHead>
              <TableHead>Especialidade</TableHead>
              <TableHead>Quadro geral</TableHead>
              <TableHead className='w-10 text-center'>Observações</TableHead>
            </TableRow>
          </TableHeader>

          {isLoading && <ReferralsSkeleton />}

          {!isLoading && isReferralsEmpty && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className='pt-2 text-center'>
                    Nenhum paciente encontrado
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && !isReferralsEmpty && (
            <TableBody>
              {referrals?.map((forwarding) => (
                <TableRow key={forwarding.id}>
                  <TableCell className='py-0'>{forwarding.nome}</TableCell>

                  <TableCell>{forwarding.encaminhadoEm}</TableCell>
                  <TableCell>{forwarding.profissional}</TableCell>
                  <TableCell>
                    <span className='border-border text-foreground-soft rounded-md border px-2 py-1'>
                      {forwarding.especialidade}
                    </span>
                  </TableCell>
                  <TableCell>
                    <AppointmentConditionTag
                      label={forwarding.quadroGeral as PatientConditionType}
                    />
                  </TableCell>
                  <TableCell className='flex justify-center'>
                    <TableButton>
                      <Eye className='text-foreground-soft/70' />
                    </TableButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Card>

      <Pagination totalItems={30} />
    </div>
  )
}
