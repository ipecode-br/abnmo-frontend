import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'

export function CalendarStepNav(props: Readonly<NavProps>) {
  const { months } = useDayPicker()

  const { onPreviousClick, onNextClick, previousMonth, nextMonth } = props
  const currentMonth = months[0].date
  const label = format(currentMonth, 'MMM, yyyy', { locale: ptBR })

  return (
    <div className='bg-background-soft mb-2 flex items-center justify-between rounded-lg p-1.5'>
      <Button
        size='icon'
        variant='outline'
        className='size-8'
        onClick={onPreviousClick}
        disabled={!previousMonth}
      >
        <ChevronLeft />
      </Button>
      <span className='text-sm font-medium capitalize'>{label}</span>
      <Button
        size='icon'
        variant='outline'
        className='size-8'
        onClick={onNextClick}
        disabled={!nextMonth}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
