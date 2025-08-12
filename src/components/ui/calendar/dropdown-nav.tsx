import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'
import { Select, SelectValue } from '../select'
import { SelectContent } from '../select/content'
import { SelectItem } from '../select/item'
import { SelectTrigger } from '../select/trigger'

const monthsOfYear = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const startYear = 2000
const endYear = 2025

const years: number[] = []
for (let y = startYear; y <= endYear; y++) {
  years.push(y)
}

// TODO: implement a dropdown for month and year selection
export function CalendarDropdownNav(props: Readonly<NavProps>) {
  const { months, goToMonth } = useDayPicker()

  const [yearSelected, setYearSeleted] = useState<number>(2025)
  const [monthSelected, setMonthSeleted] = useState<string>('')
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

      <Select
        onValueChange={(value) => {
          setMonthSeleted(value)
          goToMonth(new Date(yearSelected, monthsOfYear.indexOf(value), 1))
        }}
      >
        <SelectTrigger size='sm' className='w-18 gap-1 px-2 pr-1'>
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {monthsOfYear.map((month) => (
            <SelectItem value={month} key={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          const year = Number(value)
          setYearSeleted(year)
          goToMonth(
            new Date(yearSelected, monthsOfYear.indexOf(monthSelected), 1),
          )
        }}
      >
        <SelectTrigger size='sm' className='gap-1 px-2 pr-1'>
          <SelectValue placeholder='2025' />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem value={String(year)} key={year}>
              {year}
            </SelectItem>
          ))}
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
