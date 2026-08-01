'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardClockIcon } from 'lucide-react'

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
import { QUERY_PARAM_KEYS } from '@/enums/params'
import {
  SURVEY_SUBMISSION_STATUS_OPTIONS,
  SURVEY_SUBMISSION_STATUSES,
} from '@/enums/surveys'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { SurveySubmissionListItem } from '@/types/surveys'
import { formatDate } from '@/utils/formatters/format-date'

import { SurveySubmissionsListActions } from './list-actions'

export function SurveySubmissionsList() {
  const { getParams, currentParams } = useParams()

  const [page, search, status] = getParams([
    QUERY_PARAM_KEYS.page,
    QUERY_PARAM_KEYS.search,
    QUERY_PARAM_KEYS.status,
  ])
  const perPage = 20

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.surveys.submissions, perPage, currentParams],
    queryFn: () =>
      api<{ submissions: SurveySubmissionListItem[]; total: number }>(
        '/survey-submissions',
        {
          params: {
            search,
            status,
            page,
            perPage,
            orderBy: 'date',
            order: 'DESC',
          },
        },
      ),
  })

  const submissions = response?.data?.submissions ?? []
  const total = response?.data?.total ?? 0

  const isEmpty = !isLoading && submissions.length <= 0

  return (
    <>
      <SectionHeader>
        <SectionHeaderTitle
          title='Solicitações'
          icon={<ClipboardClockIcon />}
          total={total}
        />

        <SectionHeaderActions>
          <SearchInput placeholder='Pesquisar' className='w-full sm:w-48' />
          <FilterSelect
            align='end'
            resetLabel='Todos'
            placeholder='Status'
            className='w-full sm:w-56'
            param={QUERY_PARAM_KEYS.status}
            options={SURVEY_SUBMISSION_STATUS_OPTIONS}
          />
        </SectionHeaderActions>
      </SectionHeader>

      <Card>
        <List>
          <ListHead>
            <span className='md:w-48 lg:w-56'>Nome completo</span>
            <span className='flex-1'>E-mail</span>
            <span className='w-24'>Status</span>
            <span className='w-24'>Data</span>
            <span className='w-8' />
          </ListHead>

          {isLoading && <ListSkeleton quantity={perPage} />}

          {isEmpty && (
            <p className='text-foreground-soft pt-8 pb-2 text-center'>
              Nenhuma soliticação encontrada.
            </p>
          )}

          {!isEmpty &&
            submissions.map((submission) => {
              const status = SURVEY_SUBMISSION_STATUSES[submission.status]
              return (
                <ListRow
                  key={submission.id}
                  className='text-foreground-soft max-md:flex-wrap last:max-md:pb-0 nth-[2]:max-md:pt-1'
                >
                  <span className='text-foreground w-full truncate leading-tight font-semibold max-md:text-lg md:w-48 lg:w-56'>
                    {submission.patient.name}
                  </span>

                  <span className='w-full whitespace-nowrap md:flex-1 md:truncate'>
                    {submission.patient.email}
                  </span>

                  <Tag
                    size='sm'
                    variant={status.variant}
                    className='w-24 justify-center'
                  >
                    {status.label}
                  </Tag>

                  <span className='w-24 max-md:ml-auto'>
                    {formatDate(submission.createdAt, { dateStyle: 'short' })}
                  </span>

                  <SurveySubmissionsListActions submission={submission} />
                </ListRow>
              )
            })}
        </List>
      </Card>

      <Pagination totalItems={total} perPage={perPage} />
    </>
  )
}
