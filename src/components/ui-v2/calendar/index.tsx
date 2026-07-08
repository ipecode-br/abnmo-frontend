'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { DayPicker, type PropsSingle } from 'react-day-picker'

import { CalendarNav } from './nav'

export interface CalendarProps extends Omit<PropsSingle, 'mode'> {
  allowFutureDates?: boolean
  startDate?: string | Date | null
  startYear?: number
  endYear?: number
}

export function Calendar({
  allowFutureDates = true,
  startYear,
  endYear,
  ...props
}: Readonly<CalendarProps>) {
  const today = new Date()

  const startDate = props.startDate ? new Date(props.startDate) : undefined

  const dateRestrictions = {
    ...(startDate && {
      fromDate: startDate,
      fromMonth: startDate,
      disabled: (date: Date) => {
        startDate.setHours(0, 0, 0, 0)
        return date < startDate
      },
    }),
    ...(!allowFutureDates && {
      toDate: today,
      toMonth: today,
      disabled: (date: Date) => {
        today.setHours(23, 59, 59, 999)
        if (startDate) {
          startDate.setHours(0, 0, 0, 0)
          return date > today || date < startDate
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
      defaultMonth={props.selected}
      components={{
        Nav: (props) => (
          <CalendarNav startYear={startYear} endYear={endYear} {...props} />
        ),
      }}
      {...dateRestrictions}
      classNames={{
        month_caption: 'hidden',
        outside: 'text-foreground/40',
        weekday: 'font-medium text-disabled pt-4 pb-1 border-b border-border',
        day: 'overflow-hidden',
        day_button:
          'size-9 flex justify-center p-2 items-center cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors rounded-md hover:border-primary outline-none m-0.75 mt-1',
        selected:
          'text-white font-medium [&_button]:bg-primary [&_button]:border-primary',
        focused: 'text-white [&_button]:bg-primary [&_button]:border-primary',
        today:
          'text-primary font-semibold [&_button]:border [&_button]:border-border ',
        disabled: 'opacity-20 pointer-events-none',
      }}
      formatters={{
        formatWeekdayName(weekday, option) {
          const name = format(weekday, 'EEEEEE', option)
          const capitalized = name.charAt(0).toUpperCase() + name.slice(1)
          return capitalized === 'Sab' ? 'Sáb' : capitalized
        },
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
    startYear={Number} - optional
    endYear={Number} - optional
    allowFutureDates={true (default) | false} - optional
  />

*/
