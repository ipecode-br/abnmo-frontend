'use client'

import { useQuery } from '@tanstack/react-query'
import { differenceInDays } from 'date-fns'
import { Calendar, CircleAlert, ClockArrowUpIcon } from 'lucide-react'

import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import {
  PATIENT_REQUIREMENT_TYPES,
  PATIENT_REQUIREMENTS_ORDER_OPTIONS,
  type PatientRequirementsOrder,
} from '@/enums/patient-requirements'
import { getTimeDistanceToNow } from '@/helpers/get-time-distance-to-now'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type {
  PatientRequirementsOrderBy,
  QueryOrderMapping,
} from '@/types/orders'
import type { PatientRequirement } from '@/types/patient-requirements.d.ts'
import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'

import { AddPatientRequirementButton } from './add-patient-requirement-button'

// TODO: add dropdown menu
export function PendingPatientRequirements() {
  const { getParams } = useParams()

  const perPage = 12

  const [page, search, orderBy] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.orderBy,
  ])

  const ORDER_MAPPING: QueryOrderMapping<
    PatientRequirementsOrder,
    PatientRequirementsOrderBy
  > = {
    name_asc: { orderBy: 'patient', order: 'ASC' },
    name_desc: { orderBy: 'patient', order: 'DESC' },
    date_asc: { orderBy: 'date', order: 'ASC' },
    date_desc: { orderBy: 'date', order: 'DESC' },
    type_asc: { orderBy: 'type', order: 'ASC' },
    type_desc: { orderBy: 'type', order: 'DESC' },
  }

  const orderByQuery =
    ORDER_MAPPING[orderBy as PatientRequirementsOrder] ??
    ORDER_MAPPING['date_asc']

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.approvals.pending, search, page, orderByQuery],
    queryFn: () =>
      api<{ requirements: PatientRequirement[]; total: number }>(
        '/patient-requirements',
        {
          params: {
            page,
            perPage,
            search,
            status: 'pending',
            ...orderByQuery,
          },
        },
      ),
  })

  const requirements = response?.data?.requirements ?? []
  const total = response?.data?.total ?? 0

  const isEmpty = requirements.length === 0
  const hasActiveFilters = !!search

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Envios pendentes'
          icon={<ClockArrowUpIcon />}
          total={total}
        />
        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar nome...' className='w-56' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={PATIENT_REQUIREMENTS_ORDER_OPTIONS}
            placeholder='Ordenar por'
            resetLabel='Limpar ordem'
            className='w-52'
          />
          <AddPatientRequirementButton size='sm' />
        </SectionHeaderActions>
      </SectionHeader>

      <Card className='grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3'>
        {isLoading && <Skeleton quantity={12} className='h-40 rounded-xl' />}

        {isEmpty && !isLoading && (
          <div className='text-foreground-soft col-span-full py-8 text-center'>
            {hasActiveFilters
              ? 'Nenhuma aprovação encontrada para os filtros aplicados.'
              : 'Nenhuma aprovação pendente encontrada.'}
          </div>
        )}

        {!isEmpty &&
          requirements.map((requirement) => {
            const pendingDays = differenceInDays(
              new Date(),
              new Date(requirement.created_at),
            )

            const severityVariant = () => {
              if (pendingDays <= 3) return 'info'
              if (pendingDays <= 7) return 'warning'
              return 'error'
            }

            return (
              <Card
                key={requirement.id}
                variant={severityVariant()}
                className='flex flex-col gap-1 rounded-xl shadow-none'
              >
                <h3 className='text-lg font-medium'>
                  {requirement.patient.name}
                </h3>

                <div className='text-foreground-soft flex items-center gap-2'>
                  <span>Pendência:</span>
                  <Tag size='sm' variant={severityVariant()}>
                    {PATIENT_REQUIREMENT_TYPES[requirement.type]}
                  </Tag>
                </div>

                <div className='text-foreground-soft flex items-center gap-1'>
                  <Calendar className='text-disabled size-4.5' />
                  <span>
                    Solicitado em {formatDate(requirement.created_at)}
                  </span>
                </div>

                <div
                  data-severity={severityVariant()}
                  className={cn(
                    'mt-3 flex items-center gap-1.5',
                    'data-[severity="warning"]:text-warning',
                    'data-[severity="error"]:text-error',
                  )}
                >
                  <CircleAlert className='size-4.5' />
                  <p>Pendente {getTimeDistanceToNow(requirement.created_at)}</p>
                </div>
              </Card>
            )
          })}
      </Card>

      <Pagination perPage={perPage} totalItems={total} />
    </>
  )
}
