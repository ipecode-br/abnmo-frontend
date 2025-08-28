import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'
import { Select, SelectValue } from '../select'
import { SelectContent } from '../select/content'
import { SelectItem } from '../select/item'
import { SelectTrigger } from '../select/trigger'

const monthsOfYear = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]

const currentYear = new Date().getFullYear()
const startYear = currentYear - 120

const years: number[] = []
for (let y = currentYear; y >= startYear; y--) {
  years.push(y)
}

export function CalendarDropdownNav({
  onPreviousClick,
  onNextClick,
  previousMonth,
  nextMonth,
}: Readonly<NavProps>) {
  const { months, goToMonth } = useDayPicker()
  const { date: dateCurrent } = months[0]

  const [yearSelected, setYearSeleted] = useState<number>(currentYear)
  const [monthSelected, setMonthSeleted] = useState<string>('')

  // Check if we're in a restricted mode (no nextMonth means we're at the limit)
  const isRestricted =
    !nextMonth &&
    dateCurrent.getMonth() === new Date().getMonth() &&
    dateCurrent.getFullYear() === new Date().getFullYear()

  // Determine available years and months based on restrictions
  const availableYears = isRestricted
    ? years.filter((year) => year <= new Date().getFullYear())
    : years

  const availableMonths =
    isRestricted && yearSelected === new Date().getFullYear()
      ? monthsOfYear.filter((_, index) => index <= new Date().getMonth())
      : monthsOfYear

  useEffect(() => {
    if (!months.length) return

    setMonthSeleted(monthsOfYear[dateCurrent.getMonth()])
    setYearSeleted(dateCurrent.getFullYear())
  }, [dateCurrent, months.length])

  return (
    <div className='bg-background-soft flex items-center justify-center gap-1 rounded-lg p-1.5'>
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
        <SelectTrigger size='sm' className='h-8 w-16 gap-1 px-2 pr-1'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='min-w-24'>
          {availableMonths.map((month) => (
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
        <SelectTrigger size='sm' className='h-8 w-18 gap-1 px-2 pr-1'>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className='min-w-24'>
          {availableYears.map((year) => (
            <SelectItem value={String(year)} key={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        size='icon'
        variant='ghost'
        className='size-7 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-25'
        onClick={onNextClick}
        disabled={!nextMonth}
      >
        <ChevronRight />
      </Button>
    </div>
  )
}
