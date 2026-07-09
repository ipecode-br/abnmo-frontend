import { CalendarDaysIcon } from 'lucide-react'
import { useCallback } from 'react'
import { RefCallBack } from 'react-hook-form'

import { cn } from '@/utils/class-name-merge'
import { formatDateInput } from '@/utils/formatters/format-date-input'
import { parseDate } from '@/utils/parsers/parse-date'

import { Calendar, CalendarProps } from './calendar'
import { Input } from './input'
import { Popover, PopoverContainer, PopoverTrigger } from './popover'

export interface DatePickerProps
  extends Pick<
    CalendarProps,
    'startDate' | 'allowFutureDates' | 'startYear' | 'endYear'
  > {
  id: string
  value?: string | null
  onChange: (value: string) => void
  onBlur?: () => void
  className?: string
  disabled?: boolean
  error?: boolean
  ref?: RefCallBack
}

export function DatePicker({
  id,
  ref,
  value,
  error,
  onBlur,
  endYear,
  onChange,
  disabled,
  className,
  startDate,
  startYear,
  allowFutureDates,
}: DatePickerProps) {
  const handleCalendarSelect = useCallback(
    (selectedDate: Date | undefined) => {
      if (!selectedDate) return

      const date = new Date(selectedDate)

      const DD = String(date.getDate()).padStart(2, '0')
      const MM = String(date.getMonth() + 1).padStart(2, '0')
      const YYYY = String(date.getFullYear())

      onChange(`${DD}/${MM}/${YYYY}`)
      if (onBlur) onBlur()
    },
    [onChange, onBlur],
  )

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        'relative flex items-center aria-disabled:pointer-events-none aria-disabled:opacity-50',
        className,
      )}
    >
      <Popover>
        <PopoverTrigger
          type='button'
          disabled={disabled}
          aria-label='Abrir calendário'
          className='absolute left-1 flex size-8 rounded-md [&_svg]:size-5.5'
        >
          <CalendarDaysIcon />
        </PopoverTrigger>
        <PopoverContainer>
          <Calendar
            endYear={endYear}
            startYear={startYear}
            startDate={startDate}
            onSelect={handleCalendarSelect}
            allowFutureDates={allowFutureDates}
            selected={value ? parseDate(value) : undefined}
          />
        </PopoverContainer>
      </Popover>
      <Input
        id={id}
        ref={ref}
        value={value || ''}
        onBlur={onBlur}
        className='pl-12'
        inputMode='numeric'
        placeholder='00/00/0000'
        variant={error ? 'error' : 'default'}
        onChange={(e) => {
          const formattedValue = formatDateInput(e.target.value)
          onChange(formattedValue)
        }}
      />
    </div>
  )
}
