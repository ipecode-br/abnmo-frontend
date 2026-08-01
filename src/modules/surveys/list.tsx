'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardListIcon } from 'lucide-react'
import React from 'react'

import { FilterSelect } from '@/components/filters/filter-select'
import { SearchInput } from '@/components/filters/search-input'
import { Pagination } from '@/components/pagination'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderTitle,
} from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { List, ListHead, ListRow, ListSkeleton } from '@/components/ui/list'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { SURVEY_STATUS_OPTIONS, SURVEY_STATUSES } from '@/enums/surveys'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { SurveyListItem } from '@/types/surveys'
import { formatDate } from '@/utils/formatters/format-date'

export function SurveysList() {
  const { getParams, currentParams } = useParams()

  const [page, search, status] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.status,
  ])
  const perPage = 20

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.surveys.main, perPage, currentParams],
    queryFn: () =>
      api<{ surveys: SurveyListItem[]; total: number }>('/surveys', {
        params: { search, status, page, perPage },
      }),
  })

  const surveys = response?.data?.surveys ?? []
  const total = response?.data?.total ?? 0

  const isEmpty = !isLoading && surveys.length <= 0

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Catalogações'
          icon={<ClipboardListIcon />}
          total={total}
        />

        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar' className='w-full sm:w-48' />
          <FilterSelect
            align='end'
            resetLabel='Todos'
            placeholder='Status'
            className='w-full sm:w-40'
            param={QUERY_PARAM_KEYS.status}
            options={SURVEY_STATUS_OPTIONS}
          />
        </SectionHeaderActions>
      </SectionHeader>

      <Card className='md:p-6'>
        <List>
          <ListHead>
            <span className='md:w-48 lg:w-56'>Nome completo</span>
            <span className='flex-1'>E-mail</span>
            <span className='w-24'>Status</span>
            <span className='w-24'>Data</span>
          </ListHead>

          {isLoading && <ListSkeleton quantity={perPage} />}

          {isEmpty && (
            <p className='text-foreground-soft pt-8 pb-2 text-center'>
              Nenhuma soliticação encontrada.
            </p>
          )}

          {!isEmpty &&
            surveys.map((survey) => {
              const status = SURVEY_STATUSES[survey.status]
              return (
                <ListRow
                  key={survey.id}
                  className='text-foreground-soft max-md:flex-wrap last:max-md:pb-0 nth-[2]:max-md:pt-1'
                >
                  <a
                    href={ROUTES.surveys.details(survey.id)}
                    className='text-foreground hover:text-primary w-full truncate leading-tight font-semibold max-md:text-lg md:w-48 lg:w-56'
                  >
                    {survey.name}
                  </a>

                  <span className='w-full whitespace-nowrap md:flex-1 md:truncate'>
                    {survey.email}
                  </span>

                  <Tag
                    size='sm'
                    variant={status.variant}
                    className='w-24 justify-center'
                  >
                    {status.label}
                  </Tag>
                  <span className='w-24 max-md:ml-auto'>
                    {formatDate(survey.createdAt, { dateStyle: 'short' })}
                  </span>
                </ListRow>
              )
            })}
        </List>
      </Card>

      <Pagination totalItems={total} perPage={perPage} />
    </>
  )
}
