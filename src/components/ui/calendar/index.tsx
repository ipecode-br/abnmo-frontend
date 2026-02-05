'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  DayPicker,
  getDefaultClassNames,
  type PropsSingle,
} from 'react-day-picker'

import { cn } from '@/utils/class-name-merge'

import { CalendarDropdownNav } from './dropdown-nav'
import { CalendarStepNav } from './step-nav'

export interface CalendarProps extends Omit<PropsSingle, 'mode'> {
  navMode?: 'step' | 'dropdown'
  allowFutureDates?: boolean
  startDate?: string | Date
}

export function Calendar({
  navMode = 'step',
  allowFutureDates,
  startDate,
  ...props
}: Readonly<CalendarProps>) {
  const defaultClassNames = getDefaultClassNames()

  const dateRestrictions = {
    ...(startDate && {
      fromDate: new Date(startDate),
      fromMonth: new Date(startDate),
      disabled: (date: Date) => {
        const start = new Date(startDate)
        start.setHours(0, 0, 0, 0)
        return date < start
      },
    }),
    ...(!allowFutureDates && {
      toDate: new Date(),
      toMonth: new Date(),
      disabled: (date: Date) => {
        const today = new Date()
        today.setHours(23, 59, 59, 999)
        if (startDate) {
          const start = new Date(startDate)
          start.setHours(0, 0, 0, 0)
          return date > today || date < start
        }
        return date > today
      },
    }),
  }

  return (
    <DayPicker
      mode='single'
      locale={ptBR}
      showOutsideDays
      {...dateRestrictions}
      classNames={{
        months: 'p-0 space-y-2',
        month_caption: 'hidden',
        outside: 'text-disabled/50',
        weekday: cn(defaultClassNames.weekday, 'text-xs text-disabled'),
        day: 'rounded-md overflow-hidden',
        day_button:
          'size-8 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground outline-none disabled:opacity-100',
        selected: 'bg-primary text-white font-medium',
        focused: 'text-white bg-primary ',
        today: 'text-primary font-medium',
        disabled: 'opacity-25 pointer-events-none',
      }}
      formatters={{
        formatWeekdayName(weekday, option) {
          return format(weekday, 'EEEEE', option)
        },
      }}
      components={{
        Nav: navMode === 'step' ? CalendarStepNav : CalendarDropdownNav,
      }}
      {...props}
    />
  )
}

/* USAGE

  <Calendar
    selected={selectedDate}
    onSelect={setSelectedDate}
    navMode="dropdown" | "step" (default)
    allowFutureDates={true | false (default)} - optional
  />

*/
