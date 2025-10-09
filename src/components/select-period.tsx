import { QUERY_PERIODS_OPTIONS, type QueryPeriodType } from '@/types/queries'

import { Select, SelectValue } from './ui/select'
import { SelectContent } from './ui/select/content'
import { SelectItem } from './ui/select/item'
import { SelectTrigger } from './ui/select/trigger'

interface SelectPeriodProps {
  period: QueryPeriodType
  onSelect: (value: QueryPeriodType) => void
}

export function SelectPeriod({
  period,
  onSelect,
}: Readonly<SelectPeriodProps>) {
  return (
    <Select
      value={period}
      onValueChange={(value: QueryPeriodType) => onSelect(value)}
    >
      <SelectTrigger size='xs'>
        <SelectValue />
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
