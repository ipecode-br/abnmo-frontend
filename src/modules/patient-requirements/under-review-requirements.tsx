'use client'

import { useQuery } from '@tanstack/react-query'
import { CircleAlertIcon, ClipboardClockIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

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

import { AddPatientRequirementButton } from './add-patient-requirement-button'

// TODO: add dropdown actions menu
export function UnderReviewPatientRequirements() {
  const [stableTotal, setStableTotal] = useState(0)
  const { getParam } = useParams()

  const perPage = 12
  const page = getParam(QUERY_PARAM_KEYS.page)
  const search = getParam(QUERY_PARAM_KEYS.search)
  const orderBy = getParam(QUERY_PARAM_KEYS.orderBy)

  const ORDER_MAPPING: QueryOrderMapping<
    PatientRequirementsOrder,
    PatientRequirementsOrderBy
  > = {
    name_asc: { orderBy: 'patient', order: 'ASC' },
    name_desc: { orderBy: 'patient', order: 'DESC' },
    date_asc: { orderBy: 'submitted_at', order: 'ASC' },
    date_desc: { orderBy: 'submitted_at', order: 'DESC' },
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
            status: 'under_review',
            ...orderByQuery,
          },
        },
      ),
  })

  const requirements = response?.data?.requirements ?? []
  const isEmpty = requirements.length === 0
  const hasActiveFilters = !!search

  useEffect(() => {
    if (response?.data) {
      setStableTotal(response.data.total)
    }
  }, [response?.data])

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Aprovações pendentes'
          icon={<ClipboardClockIcon />}
          total={stableTotal}
        />
        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar nome...' className='w-56' />
          <FilterSelect
            param={QUERY_PARAM_KEYS.orderBy}
            options={PATIENT_REQUIREMENTS_ORDER_OPTIONS}
            placeholder='Ordenar por...'
            resetLabel='Limpar ordem'
            className='w-52'
          />
          <AddPatientRequirementButton size='sm' />
        </SectionHeaderActions>
      </SectionHeader>

      <Card className='grid gap-4 p-6 sm:grid-cols-2 xl:grid-cols-3'>
        {isLoading && <Skeleton quantity={12} className='h-32 rounded-xl' />}

        {isEmpty && !isLoading && (
          <div className='text-foreground-soft col-span-full py-8 text-center'>
            {hasActiveFilters
              ? 'Nenhuma aprovação encontrada para os filtros aplicados.'
              : 'Nenhuma aprovação em análise encontrada.'}
          </div>
        )}

        {!isEmpty &&
          requirements.map((requirement) => (
            <Card
              key={requirement.id}
              className='flex flex-col gap-1 rounded-xl'
            >
              <h3 className='text-lg font-medium'>
                {requirement.patient.name}
              </h3>
              <div className='text-foreground-soft flex items-center gap-1'>
                <CircleAlertIcon className='text-success size-4.5' />
                <span>
                  Recebido{' '}
                  {getTimeDistanceToNow(requirement.submitted_at ?? '')}
                </span>
              </div>

              <div className='mt-3 flex items-center gap-1.5'>
                <span>Tipo de solicitação:</span>
                <Tag variant='success' size='sm'>
                  {PATIENT_REQUIREMENT_TYPES[requirement.type]}
                </Tag>
              </div>
            </Card>
          ))}
      </Card>

      <Pagination perPage={perPage} totalItems={stableTotal} />
    </>
  )
}
