'use client'

import { useQuery } from '@tanstack/react-query'
import { ClipboardListIcon } from 'lucide-react'
import React from 'react'

import { Pagination } from '@/components/pagination'
import { SectionHeader, SectionHeaderTitle } from '@/components/section-header'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { Skeleton } from '@/components/ui/skeleton'
import { Tag } from '@/components/ui/tag'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { QUERY_PARAM_KEYS } from '@/enums/params'
import { SURVEY_STATUSES } from '@/enums/surveys'
import { useParams } from '@/hooks/params'
import { api } from '@/lib/api'
import type { Survey } from '@/types/surveys'
import { formatDate } from '@/utils/formatters/format-date'
import { formatPhoneNumber } from '@/utils/formatters/format-phone-number'

export function SurveysList() {
  const { getParams, currentParams } = useParams()

  const [page] = getParams([QUERY_PARAM_KEYS.page])
  const perPage = 20

  const { data: response, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.surveys.main, perPage, currentParams],
    queryFn: () =>
      api<{ surveys: Survey[]; total: number }>('/surveys', {
        params: { page, perPage },
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
      </SectionHeader>

      <Card className='flex flex-col gap-4 p-6 md:gap-3'>
        {isLoading && <Skeleton quantity={perPage} className='h-10 w-full' />}

        {isEmpty && (
          <p className='text-foreground-soft p-8 text-center'>
            Nenhuma catalogação encontrada.
          </p>
        )}

        {!isEmpty &&
          surveys.map((survey, index) => {
            const status = SURVEY_STATUSES[survey.status]
            return (
              <React.Fragment key={survey.id}>
                {index !== 0 && <Divider />}
                <div className='text-foreground-soft flex gap-x-4 gap-y-2 max-md:flex-col md:items-center'>
                  <a
                    href={ROUTES.dashboard.surveys.details(survey.id)}
                    className='text-foreground hover:text-primary truncate leading-tight font-semibold max-md:text-lg md:w-48 lg:w-56'
                  >
                    {survey.name}
                  </a>

                  <div className='flex flex-1 flex-wrap gap-1'>
                    <span className='w-36'>
                      {formatPhoneNumber(survey.phone)}
                    </span>
                    <span className='flex-1 whitespace-nowrap md:truncate'>
                      {survey.email}
                    </span>
                  </div>

                  <div className='flex items-center justify-between gap-2'>
                    <Tag variant={status.variant} size='sm'>
                      {status.label}
                    </Tag>
                    <span className='w-24 text-right'>
                      {formatDate(survey.createdAt, {
                        dateStyle: 'short',
                      })}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            )
          })}
      </Card>

      <Pagination totalItems={total} perPage={perPage} />
    </>
  )
}
