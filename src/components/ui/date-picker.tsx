'use client'

import 'react-day-picker/style.css'

import { CalendarDaysIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'
import { parseDateOnly } from '@/utils/parse-date-only'

import { Calendar, type CalendarProps } from './calendar'
import { Popover } from './popover'
import { PopoverContent } from './popover/content'
import { PopoverTrigger, type PopoverTriggerProps } from './popover/trigger'

export interface DatePickerProps
  extends Omit<PopoverTriggerProps, 'value'>,
    Pick<CalendarProps, 'allowFutureDates' | 'navMode' | 'startDate'> {
  value?: string | null
  onSelectDate?: (date: string) => void
  modal?: boolean
  placeholder?: string
}

export function DatePicker({
  value,
  navMode,
  className,
  allowFutureDates,
  onSelectDate,
  modal,
  startDate,
  placeholder = 'Selecionar data',
  ...props
}: Readonly<DatePickerProps>) {
  const [open, setOpen] = useState(false)

  const handleCalendarSelect = useCallback(
    (selectedDate: Date | undefined) => {
      if (!selectedDate) return

      onSelectDate?.(selectedDate.toISOString())
      setOpen(false)
    },
    [onSelectDate],
  )

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger
        variant='outline'
        className={cn(
          '[&_svg]:text-disabled justify-start overflow-hidden pl-3 font-normal [&_svg]:size-4.5',
          className,
        )}
        {...props}
      >
        <CalendarDaysIcon />
        {value ? (
          formatDate(value, { dateStyle: 'short' })
        ) : (
          <span className='text-disabled'>{placeholder}</span>
        )}
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          navMode={navMode}
          startDate={startDate}
          onSelect={handleCalendarSelect}
          allowFutureDates={allowFutureDates}
          selected={value ? new Date(value) : undefined}
        />
      </PopoverContent>
    </Popover>
  )
}
