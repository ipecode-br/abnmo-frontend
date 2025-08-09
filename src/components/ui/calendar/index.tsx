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

interface CalendarProps extends Omit<PropsSingle, 'mode'> {
  navMode?: 'step' | 'dropdown'
}

export function Calendar({
  navMode = 'step',
  ...props
}: Readonly<CalendarProps>) {
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
          'size-8 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground outline-none',
        selected: 'bg-primary text-white font-medium',
        focused: 'text-white bg-primary ',
        today: 'text-primary font-medium',
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
