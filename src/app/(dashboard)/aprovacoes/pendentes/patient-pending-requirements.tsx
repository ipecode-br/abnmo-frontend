'use client'
import { useQuery } from '@tanstack/react-query'
import { Calendar, CircleAlert } from 'lucide-react'

import { PendingRequirementsSkeleton } from '@/app/(dashboard)/aprovacoes/pendentes/skeleton'
import { DataTableHeader } from '@/components/data-table/header'
import { DataTableHeaderActions } from '@/components/data-table/header/actions'
import { DataTableHeaderSearch } from '@/components/data-table/header/search'
import { Pagination } from '@/components/pagination'
import { Card } from '@/components/ui/card'
import { DocumentTag } from '@/components/ui/document-tag'
import { DocumentType } from '@/constants/documents'
import {
  getPendingDays,
  getPendingStatusColor,
} from '@/helpers/pending-helpers'
import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'

import { PendingButton } from './add-pending-button'
import { mockPendingRequirements } from './mock-data'

interface PendingRequirement {
  id: string
  patientName: string
  documentType: DocumentType
  createdAt: Date | string
}

const PENDING_STATUS_CLASSES: Record<
  ReturnType<typeof getPendingStatusColor>,
  string
> = {
  error: 'bg-error/10 border-none',
  warning: 'bg-warning/10 border-none',
  default: 'bg-foreground-soft/10 border-none',
}

const PENDING_TEXT_CLASSES: Record<
  ReturnType<typeof getPendingStatusColor>,
  string
> = {
  error: 'text-error',
  warning: 'text-warning',
  default: 'text-foreground-soft',
}

export function PatientPendingRequirements() {
  const { data, isLoading } = useQuery<PendingRequirement[]>({
    queryKey: ['pending-requirements'],
    // TODO: replace with real API call
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockPendingRequirements)
        }, 2000)
      })
    },
  })

  if (isLoading) {
    return <PendingRequirementsSkeleton />
  }

  if (!data || data.length === 0)
    return (
      <p className='text-foreground-soft p-4 text-sm'>
        Nenhuma pendência encontrada.
      </p>
    )

  return (
    <>
      <DataTableHeader>
        <DataTableHeaderActions>
          <DataTableHeaderSearch placeholder='Pesquisar nome...' />
          <PendingButton size='sm' />
        </DataTableHeaderActions>
      </DataTableHeader>

      <Card className='mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {data.map((requirement: PendingRequirement) => {
          const daysPending = getPendingDays(requirement.createdAt)
          const status = getPendingStatusColor(daysPending)
          const cardColor = PENDING_STATUS_CLASSES[status]
          const pendingTextColor = PENDING_TEXT_CLASSES[status]
          const createdDate = new Date(requirement.createdAt as Date)

          return (
            <Card key={requirement.id} className={cardColor}>
              <div className='mb-6 flex flex-col gap-1'>
                <h2 className='text-accent-foreground font-medium'>
                  {requirement.patientName}
                </h2>

                <div className='flex items-center gap-2'>
                  <p className='text-foreground-soft'>Pendência: </p>
                  <DocumentTag
                    documentType={requirement.documentType}
                    createdAt={requirement.createdAt}
                    className='font-medium'
                  />
                </div>

                <div className='text-foreground-soft flex items-center gap-1'>
                  <Calendar className='text-accent-foreground size-4' />
                  <span>Solicitado em: {formatDate(createdDate)}</span>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-center gap-1 font-medium',
                  pendingTextColor,
                )}
              >
                <CircleAlert
                  className={cn('size-4', pendingTextColor)}
                  strokeWidth={3}
                />
                <p>
                  Pendente há {daysPending} {daysPending === 1 ? 'dia' : 'dias'}
                </p>
              </div>
            </Card>
          )
        })}
      </Card>
      <Pagination totalItems={data.length} />
    </>
  )
}
