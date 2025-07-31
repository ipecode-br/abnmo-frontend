import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  DayPicker,
  DayPickerProps,
  FooterProps,
  getDefaultClassNames,
} from 'react-day-picker'

import { PopoverClose } from '../popover/close'
import { Button } from '../ui/button'
import { CalendarNav } from './nav'

type CalendarProps = DayPickerProps & {
  onSelectedDate: (date: Date | undefined) => void
  onOpen: Dispatch<SetStateAction<boolean>>
}

export function Calendar({ onSelectedDate, onOpen }: CalendarProps) {
  const [selected] = useState<Date | undefined>()

  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      mode='single'
      locale={ptBR}
      showOutsideDays
      footer
      selected={selected}
      onSelect={(selected) => onSelectedDate(selected)}
      classNames={{
        root: `${defaultClassNames.root} border-border rounded-2xl border`,
        months: 'p-5',
        month_caption: 'hidden',
        outside: 'text-disabled opacity-30',
        weekday: `${defaultClassNames.weekday} text-disabled`,
        day: 'rounded-lg',
        day_button: 'w-10 h-10 text-sm font-medium cursor-pointer',
        range_start: 'bg-primary text-white',
        range_middle: 'bg-accent',
        range_end: 'bg-primary text-white',
        focused: 'text-white bg-primary',
        today: 'text-primary',
      }}
      formatters={{
        formatWeekdayName(weekday, option) {
          return format(weekday, 'EEEEE', option)
        },
      }}
      components={{
        Nav: CalendarNav,
        Footer: (props: FooterProps) => {
          return (
            <footer
              {...props}
              className='border-border flex gap-4 border-t p-4'
            >
              <PopoverClose
                variant='ghost'
                className='border-border text-foreground-soft flex-1 border'
              >
                Cancelar
              </PopoverClose>
              <Button className='flex-1' onClick={() => onOpen(false)}>
                Aplicar
              </Button>
            </footer>
          )
        },
      }}
    />
  )
}
