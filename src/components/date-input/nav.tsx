import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../ui/button'

export function CalendarNav(props: Readonly<NavProps>) {
  const { onPreviousClick, onNextClick, previousMonth, nextMonth } = props
  const { months } = useDayPicker()
  const currentMonth = months[0].date

  const label = format(currentMonth, 'MMM, yyyy', { locale: ptBR })

  return (
    <div className='bg-background-soft mb-2 flex items-center justify-between rounded-lg p-1.5'>
      <Button
        variant='muted'
        size='xs'
        onClick={onPreviousClick}
        disabled={!previousMonth}
        className='bg-background text-foreground-soft rounded-lg'
      >
        <ChevronLeft />
      </Button>
      <span className='text-sm font-medium capitalize'>{label}</span>
      <Button
        variant='muted'
        size='xs'
        onClick={onNextClick}
        disabled={!nextMonth}
        className='bg-background text-foreground-soft rounded-lg'
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
