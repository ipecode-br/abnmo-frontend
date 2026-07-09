'use client'

import { Select, type SelectProps } from '@/components/ui-v2/select'
import { QUERY_PARAM_KEYS, type QueryParamKey } from '@/enums/params'
import { useParams } from '@/hooks/params'

interface FilterSelectProps extends SelectProps {
  param: QueryParamKey
}

export function FilterSelect({ param, ...props }: Readonly<FilterSelectProps>) {
  const { getParam, updateParams } = useParams()

  const pageParam = QUERY_PARAM_KEYS.page
  const selectedValue = getParam(param) || ''

  function handleSelect(value: string | null) {
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
    <Select value={selectedValue} onValueChange={handleSelect} {...props} />
  )
}
