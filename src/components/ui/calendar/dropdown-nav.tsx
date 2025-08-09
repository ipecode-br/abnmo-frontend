import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'
import { Select, SelectValue } from '../select'
import { SelectContent } from '../select/content'
import { SelectItem } from '../select/item'
import { SelectTrigger } from '../select/trigger'

// TODO: implement a dropdown for month and year selection
export function CalendarDropdownNav(props: Readonly<NavProps>) {
  const { months } = useDayPicker()

  const { onPreviousClick, onNextClick, previousMonth, nextMonth } = props
  const currentMonth = months[0].date
  const label = format(currentMonth, 'MMM', { locale: ptBR })

  return (
    <div className='bg-background-soft mb-2 flex items-center justify-center gap-1 rounded-lg p-1.5'>
      <Button
        size='icon'
        variant='ghost'
        className='size-7'
        onClick={onPreviousClick}
        disabled={!previousMonth}
      >
        <ChevronLeft />
      </Button>

      <Select>
        <SelectTrigger size='sm' className='w-18 gap-1 px-2 pr-1'>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='1'>Content here</SelectItem>
          <SelectItem value='2'>Content here</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger size='sm' className='gap-1 px-2 pr-1'>
          <SelectValue placeholder='2025' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='1'>Content here</SelectItem>
          <SelectItem value='2'>Content here</SelectItem>
        </SelectContent>
      </Select>

      <Button
        size='icon'
        variant='ghost'
        className='size-7'
        onClick={onNextClick}
        disabled={!nextMonth}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
