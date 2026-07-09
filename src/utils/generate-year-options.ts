import { SelectOption } from '@/components/ui-v2/select'

interface GenerateYearOptionsProps {
  startYear: number
  endYear: number
  order?: 'ASC' | 'DESC'
}

export function generateYearOptions({
  order = 'DESC',
  startYear,
  endYear,
}: GenerateYearOptionsProps) {
  const YEARS_OPTIONS: SelectOption[] = []

  if (order === 'DESC') {
    for (let y = endYear; y >= startYear; y--) {
      YEARS_OPTIONS.push({
        label: String(y),
        value: String(y),
      })
    }
    return YEARS_OPTIONS
  }

  for (let y = startYear; y <= endYear; y++) {
    YEARS_OPTIONS.push({
      label: String(y),
      value: String(y),
    })
  }

  return YEARS_OPTIONS
}
