'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker, type PropsSingle } from 'react-day-picker'

import { CalendarDropdownNav } from './dropdown-nav'
import { CalendarStepNav } from './step-nav'

export interface CalendarProps extends Omit<PropsSingle, 'mode'> {
  navMode?: 'step' | 'dropdown'
  allowFutureDates?: boolean
  startDate?: string | Date | null
}

export function Calendar({
  navMode = 'step',
  allowFutureDates,
  startDate,
  ...props
}: Readonly<CalendarProps>) {
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
        months: 'p-1',
        month_caption: 'hidden',
        outside: 'text-disabled/50',
        weekday: 'font-medium text-disabled pt-2 pb-1 border-b border-border',
        week: 'pt-2',
        day: 'overflow-hidden',
        day_button:
          'size-9 flex justify-center p-2 items-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-md hover:border-primary outline-none m-0.25 mt-1',
        selected:
          'text-white font-medium [&_button]:bg-primary [&_button]:border-primary',
        focused: 'text-white [&_button]:bg-primary [&_button]:border-primary',
        today:
          'text-primary font-semibold [&_button]:border [&_button]:border-border ',
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
    startDate={Date} - optional
    navMode={"dropdown" | "step" (default)} - optional 
    allowFutureDates={true | false (default)} - optional
  />

*/
