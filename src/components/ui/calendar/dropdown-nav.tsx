import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '../button'
import { Select, type SelectOption } from '../select'

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

  const monthOptions: SelectOption[] = availableMonths.map((month) => ({
    label: month,
    value: month,
  }))

  const yearOptions: SelectOption[] = availableYears.map((year) => ({
    label: String(year),
    value: String(year),
  }))

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
        <ChevronLeftIcon />
      </Button>

      <Select
        value={monthSelected}
        onValueChange={(value: string) => {
          setMonthSeleted(value)
          goToMonth(new Date(yearSelected, monthsOfYear.indexOf(value)))
        }}
        options={monthOptions}
        className='h-8 w-16'
      />

      <Select
        value={yearSelected.toString()}
        onValueChange={(value: string) => {
          const year = Number(value)
          setYearSeleted(year)
          goToMonth(new Date(year, monthsOfYear.indexOf(monthSelected)))
        }}
        options={yearOptions}
        className='h-8 w-18'
      />

      <Button
        size='icon'
        variant='ghost'
        className='size-7 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:opacity-25'
        onClick={onNextClick}
        disabled={!nextMonth}
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}
