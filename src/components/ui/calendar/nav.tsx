import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { NavProps, useDayPicker } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { MONTHS_OPTIONS } from '@/enums/shared'
import { generateYearOptions } from '@/utils/generate-year-options'

import { Select } from '../select'

interface CalendarNavProps extends NavProps {
  startYear?: number
  endYear?: number
}

export function CalendarNav({
  onPreviousClick,
  previousMonth,
  onNextClick,
  nextMonth,
  startYear,
  endYear,
}: CalendarNavProps) {
  const { months, goToMonth } = useDayPicker()

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentDate = months[0]?.date || today

  const selectedMonth = currentDate.getMonth()
  const selectedYear = currentDate.getFullYear()

  const YEARS_OPTIONS = generateYearOptions({
    startYear: startYear || currentYear - 120,
    endYear: endYear || currentYear,
  })

  return (
    <div className='bg-accent flex items-center justify-center gap-1 rounded-lg p-1.5'>
      <Button
        variant='muted'
        className='text-foreground-soft mr-auto size-8 [&_svg]:size-6'
        onClick={onPreviousClick}
        disabled={!previousMonth}
      >
        <ChevronLeftIcon strokeWidth={2} />
      </Button>

      <Select
        placeholder='Mês'
        className='h-8 w-26'
        options={MONTHS_OPTIONS}
        contentClassName='min-w-36'
        value={String(selectedMonth)}
        onValueChange={(value) => {
          if (!value) return
          goToMonth(new Date(selectedYear, Number(value)))
        }}
      />

      <Select
        placeholder='Ano'
        options={YEARS_OPTIONS}
        value={selectedYear.toString()}
        className='h-8 w-24'
        onValueChange={(value) => {
          if (!value) return
          goToMonth(new Date(Number(value), selectedMonth))
        }}
      />

      <Button
        variant='muted'
        className='text-foreground-soft ml-auto size-8 [&_svg]:size-6'
        onClick={onNextClick}
        disabled={!nextMonth}
      >
        <ChevronRightIcon strokeWidth={2} />
      </Button>
    </div>
  )
}
