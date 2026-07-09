'use client'

import { QUERY_PERIODS_OPTIONS, type QueryPeriod } from '@/enums/queries'

import { Select, type SelectOption } from './ui-v2/select'

interface SelectPeriodProps {
  period: QueryPeriod
  disabled?: boolean
  onSelect: (value: QueryPeriod) => void
}

export function SelectPeriod({
  period,
  disabled,
  onSelect,
}: SelectPeriodProps) {
  const options: SelectOption[] = QUERY_PERIODS_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
  }))

  return (
    <Select
      align='end'
      value={period}
      options={options}
      disabled={disabled}
      onValueChange={(value) => {
        if (!value) return
        onSelect(value as QueryPeriod)
      }}
    />
  )
}
