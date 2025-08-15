import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'
import { Select, SelectValue } from '../select'
import { SelectContent } from '../select/content'
import { SelectItem } from '../select/item'
import { SelectTrigger } from '../select/trigger'

const monthsOfYear = [
  'jan.',
  'fev.',
  'mar.',
  'abr.',
  'mai.',
  'jun.',
  'jul.',
  'ago.',
  'set.',
  'out.',
  'nov.',
  'dez.',
]

const startYear = 1900
const endYear = new Date().getFullYear()

const years: number[] = []
for (let y = startYear; y <= endYear; y++) {
  years.push(y)
}

// TODO: implement a dropdown for month and year selection
export function CalendarDropdownNav(props: Readonly<NavProps>) {
  const { months, goToMonth } = useDayPicker()
  const { date: dateCurrent } = months[0]

  const [yearSelected, setYearSeleted] = useState<number>(0)
  const [monthSelected, setMonthSeleted] = useState<string>('')
  const { onPreviousClick, onNextClick, previousMonth, nextMonth } = props

  useEffect(() => {
    if (!months.length) return

    setMonthSeleted(monthsOfYear[dateCurrent.getMonth()])
    setYearSeleted(dateCurrent.getFullYear())
  }, [dateCurrent, months.length])

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
        value={monthSelected}
        onValueChange={(value) => {
          setMonthSeleted(value)
          goToMonth(new Date(yearSelected, monthsOfYear.indexOf(value)))
        }}
      >
        <SelectTrigger size='sm' className='w-18 gap-1 px-2 pr-1'>
          <SelectValue />
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
        value={yearSelected.toString()}
        onValueChange={(value) => {
          const year = Number(value)
          setYearSeleted(year)
          goToMonth(new Date(year, monthsOfYear.indexOf(monthSelected)))
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
