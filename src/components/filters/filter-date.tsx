'use client'

import { CalendarDaysIcon } from 'lucide-react'

import { QUERY_PARAM_KEYS } from '@/enums/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'
import { parseDate } from '@/utils/parsers/parse-date'

import { Calendar } from '../ui/calendar'
import { Label, LabelWrapper } from '../ui/label'
import { Popover, PopoverContainer, PopoverTrigger } from '../ui/popover'

interface FilterDateProps extends React.ComponentProps<'div'> {
  allowFutureDates?: boolean
}

export function FilterDate({
  allowFutureDates,
  className,
  ...props
}: Readonly<FilterDateProps>) {
  const { getParams, updateParams } = useParams()

  const startDateParam = QUERY_PARAM_KEYS.startDate
  const endDateParam = QUERY_PARAM_KEYS.endDate

  const [startDate, endDate] = getParams([startDateParam, endDateParam])

  const selectedStartDate =
    parseDate<Date>(startDate, { input: 'YYYY-MM-DD' }) || undefined
  const selectedEndDate =
    parseDate<Date>(endDate, { input: 'YYYY-MM-DD' }) || undefined

  function handleSelectDate(
    value: Date | undefined,
    key: typeof startDateParam | typeof endDateParam,
  ) {
    if (!value) return

    updateParams({
      set: [{ key, value: parseDate(value, { output: 'YYYY-MM-DD' })! }],
      remove: [QUERY_PARAM_KEYS.page],
    })
  }

  return (
    <div className={cn('flex flex-wrap gap-2 lg:w-80', className)} {...props}>
      <LabelWrapper className='flex-1'>
        <Label>Data inicial</Label>
        <Popover>
          <PopoverTrigger
            aria-label='Abrir calendário'
            className='[&_svg]:text-foreground-soft font-normal'
          >
            <CalendarDaysIcon />
            <span
              data-active={!!selectedStartDate}
              className='data-[active=true]:text-foreground text-disabled tracking-tight tabular-nums'
            >
              {selectedStartDate ? formatDate(selectedStartDate) : '00/00/0000'}
            </span>
          </PopoverTrigger>
          <PopoverContainer>
            <Calendar
              selected={selectedStartDate}
              allowFutureDates={allowFutureDates}
              onSelect={(value) => handleSelectDate(value, startDateParam)}
            />
          </PopoverContainer>
        </Popover>
      </LabelWrapper>
      <LabelWrapper className='flex-1'>
        <Label>Data final</Label>
        <Popover>
          <PopoverTrigger
            aria-label='Abrir calendário'
            className='[&_svg]:text-foreground-soft font-normal'
            disabled={!startDate}
          >
            <CalendarDaysIcon />
            <span
              data-active={!!selectedEndDate}
              className='data-[active=true]:text-foreground text-disabled tracking-tight tabular-nums'
            >
              {selectedEndDate ? formatDate(selectedEndDate) : '00/00/0000'}
            </span>
          </PopoverTrigger>
          <PopoverContainer>
            <Calendar
              selected={selectedEndDate}
              startDate={selectedStartDate}
              allowFutureDates={allowFutureDates}
              onSelect={(value) => handleSelectDate(value, endDateParam)}
            />
          </PopoverContainer>
        </Popover>
      </LabelWrapper>
    </div>
  )
}
