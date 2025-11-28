'use client'

import { QUERY_PERIODS_OPTIONS, type QueryPeriod } from '@/types/queries'

import { Select, type SelectOption } from './ui/select'

interface SelectPeriodProps {
  period: QueryPeriod
  disabled?: boolean
  onSelect: (value: QueryPeriod) => void
}

export function SelectPeriod({
  period,
  disabled,
  onSelect,
}: Readonly<SelectPeriodProps>) {
  const options: SelectOption[] = QUERY_PERIODS_OPTIONS.map((option) => ({
    label: option.label,
    value: option.value,
  }))

  function handleValueChange(value: string) {
    onSelect(value as QueryPeriod)
  }

  return (
    <Select
      value={period}
      options={options}
      onValueChange={handleValueChange}
      disabled={disabled}
    />
  )
}
