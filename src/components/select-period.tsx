'use client'

import { QUERY_PERIODS_OPTIONS, type QueryPeriodType } from '@/types/queries'

import { Select, SelectValue } from './ui/select'
import { SelectContent } from './ui/select/content'
import { SelectItem } from './ui/select/item'
import { SelectTrigger } from './ui/select/trigger'

interface SelectPeriodProps {
  period: QueryPeriodType
  onSelect: (value: QueryPeriodType) => void
  disabled?: boolean
}

export function SelectPeriod({
  period,
  disabled,
  onSelect,
}: Readonly<SelectPeriodProps>) {
  const defaultValue = QUERY_PERIODS_OPTIONS.find(
    (option) => option.value === period,
  )

  return (
    <Select
      value={period}
      onValueChange={(value: QueryPeriodType) => onSelect(value)}
    >
      <SelectTrigger size='sm' disabled={disabled}>
        <SelectValue>{defaultValue?.label}</SelectValue>
      </SelectTrigger>
      <SelectContent align='end' className='min-w-44'>
        {QUERY_PERIODS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
