'use client'

import 'react-day-picker/style.css'

import { CalendarDays } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'

import { Calendar, type CalendarProps } from './calendar'
import { Popover } from './popover'
import { PopoverContent } from './popover/content'
import { PopoverTrigger, type PopoverTriggerProps } from './popover/trigger'

export interface DatePickerProps
  extends Omit<PopoverTriggerProps, 'value'>,
    Pick<CalendarProps, 'blockFutureDates' | 'navMode'> {
  value?: string
  onSelectDate?: (date: string) => void
}

export function DatePicker({
  value,
  navMode,
  className,
  blockFutureDates,
  onSelectDate,
  ...props
}: Readonly<DatePickerProps>) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(value ?? '')

  const handleCalendarSelect = useCallback(
    (selectedDate: Date | undefined) => {
      if (!selectedDate) {
        return
      }

      if (onSelectDate) {
        onSelectDate(selectedDate ? selectedDate.toISOString() : '')
      }

      setDate(selectedDate.toISOString())
      setOpen(false)
    },
    [onSelectDate],
  )

  useEffect(() => {
    setDate(value ?? '')
  }, [value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        variant='outline'
        className={cn(
          '[&_svg]:text-disabled justify-start pl-3 font-normal [&_svg]:size-4.5',
          className,
        )}
        {...props}
      >
        <CalendarDays />
        {date ? (
          formatDate(date, { dateStyle: 'short' })
        ) : (
          <span className='text-disabled'>Selecione a data</span>
        )}
      </PopoverTrigger>

      <PopoverContent>
        <Calendar
          navMode={navMode}
          onSelect={handleCalendarSelect}
          blockFutureDates={blockFutureDates}
          selected={date ? new Date(date) : undefined}
        />
      </PopoverContent>
    </Popover>
  )
}
