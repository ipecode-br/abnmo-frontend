'use client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  DayPicker,
  getDefaultClassNames,
  type PropsSingle,
} from 'react-day-picker'

import { cn } from '@/utils/class-name-merge'

import { CalendarNav } from '../date-input/nav'

export function Calendar(props: Readonly<Omit<PropsSingle, 'mode'>>) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      mode='single'
      locale={ptBR}
      showOutsideDays
      classNames={{
        months: 'p-0',
        month_caption: 'hidden',
        outside: 'text-disabled/50',
        weekday: cn(defaultClassNames.weekday, 'text-xs text-disabled'),
        day: 'rounded-md overflow-hidden',
        day_button:
          'size-8 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground',
        selected: 'bg-primary text-white font-medium',
        focused: 'text-white bg-primary',
        today: 'text-primary font-medium',
      }}
      formatters={{
        formatWeekdayName(weekday, option) {
          return format(weekday, 'EEEEE', option)
        },
      }}
      components={{ Nav: CalendarNav }}
      {...props}
    />
  )
}
