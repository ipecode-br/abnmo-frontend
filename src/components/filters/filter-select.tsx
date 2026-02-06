'use client'

import { Select, type SelectProps } from '@/components/ui/select'
import { QUERY_PARAM_KEYS, type QueryParamKey } from '@/enums/params'
import { useParams } from '@/hooks/params'

interface FilterSelectProps extends SelectProps {
  param: QueryParamKey
}

export function FilterSelect({ param, ...props }: Readonly<FilterSelectProps>) {
  const { getParam, updateParams } = useParams()

  const pageParam = QUERY_PARAM_KEYS.page
  const selectValue = getParam(param) || ''

  function handleSelect(value: string) {
    if (!value || value === 'reset') {
      updateParams({ remove: [param, pageParam] })
      return
    }

    updateParams({
      set: [{ key: param, value: value }],
      remove: [pageParam],
    })
  }

  return (
    <Select
      size='sm'
      align='end'
      value={selectValue}
      onValueChange={handleSelect}
      {...props}
    />
  )
}
