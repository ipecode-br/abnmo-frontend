'use client'

import { FilterContainer } from '@/components/filters/container'
import { DatePicker } from '@/components/ui/date-picker'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

interface FilterDateProps extends React.ComponentProps<'div'> {
  allowFutureDates?: boolean
}

export function FilterDate({
  allowFutureDates,
  className,
  ...props
}: Readonly<FilterDateProps>) {
  const { getParam, updateParams } = useParams()

  const pageParam = QUERY_PARAMS.page
  const startDateParam = QUERY_PARAMS.startDate
  const endDateParam = QUERY_PARAMS.endDate
  const startDate = getParam(startDateParam) || ''
  const endDate = getParam(endDateParam) || ''

  function handleSelectStartDate(value: string) {
    updateParams({
      set: [{ key: startDateParam, value: value }],
      remove: [pageParam],
    })
  }

  function handleSelectEndDate(value: string) {
    updateParams({
      set: [{ key: endDateParam, value: value }],
      remove: [pageParam],
    })
  }

  return (
    <div className={cn('grid w-96 grid-cols-2 gap-2', className)} {...props}>
      <FilterContainer title='Data inicial'>
        <DatePicker
          size='sm'
          value={startDate}
          onSelectDate={handleSelectStartDate}
          allowFutureDates={allowFutureDates}
        />
      </FilterContainer>
      <FilterContainer title='Data final'>
        <DatePicker
          size='sm'
          value={endDate}
          onSelectDate={handleSelectEndDate}
          startDate={startDate}
          disabled={!startDate}
          allowFutureDates={allowFutureDates}
        />
      </FilterContainer>
    </div>
  )
}
