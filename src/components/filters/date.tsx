'use client'

import { FilterItem } from '@/components/filters/item'
import { DatePicker } from '@/components/ui/date-picker'
import { QUERY_PARAM_KEYS } from '@/enums/params'
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
  const { getParams, updateParams } = useParams()

  const pageParam = QUERY_PARAM_KEYS.page
  const startDateParam = QUERY_PARAM_KEYS.startDate
  const endDateParam = QUERY_PARAM_KEYS.endDate
  const [startDate, endDate] = getParams([startDateParam, endDateParam])

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
    <div className={cn('grid grid-cols-2 gap-2 lg:w-74', className)} {...props}>
      <FilterItem title='Data inicial'>
        <DatePicker
          size='sm'
          value={startDate}
          placeholder='Selecionar'
          onSelectDate={handleSelectStartDate}
          allowFutureDates={allowFutureDates}
        />
      </FilterItem>
      <FilterItem title='Data final'>
        <DatePicker
          size='sm'
          value={endDate}
          onSelectDate={handleSelectEndDate}
          placeholder='Selecionar'
          startDate={startDate}
          disabled={!startDate}
          allowFutureDates={allowFutureDates}
        />
      </FilterItem>
    </div>
  )
}
