import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'

export function CalendarStepNav(props: Readonly<NavProps>) {
  const { months } = useDayPicker()

  const { onPreviousClick, onNextClick, previousMonth, nextMonth } = props
  const currentMonth = months[0].date
  const label = format(currentMonth, 'MMMM yyyy', { locale: ptBR })

  return (
    <div className='bg-accent flex items-center justify-between rounded-lg p-1.5'>
      <Button
        size='icon_sm'
        variant='outline'
        onClick={onPreviousClick}
        disabled={!previousMonth}
      >
        <ChevronLeftIcon />
      </Button>

      <span className='font-medium capitalize'>{label}</span>

      <Button
        size='icon_sm'
        variant='outline'
        onClick={onNextClick}
        disabled={!nextMonth}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
