'use client'

import { Select, type SelectOption } from '@/components/ui/select'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderOrderByProps {
  options: SelectOption[]
  className?: string
}

export function DataTableHeaderOrderBy({
  options,
  className,
}: Readonly<DataTableHeaderOrderByProps>) {
  const { getParam, updateParams } = useParams()

  const orderByParam = QUERY_PARAMS.orderBy
  const orderBy = getParam(orderByParam)

  function handleSelect(value: string | null) {
    if (!value || value === 'reset') {
      updateParams({ remove: [orderByParam] })
      return
    }

    updateParams({ set: [{ key: orderByParam, value }] })
  }

  const enhancedOptions: SelectOption[] = [
    ...options.map(({ label, value }) => ({ label: label, value: value })),
    ...(orderBy ? [{ label: 'Limpar ordem', value: 'reset' }] : []),
  ]

  return (
    <Select
      value={orderBy}
      options={enhancedOptions}
      placeholder='Ordenar por'
      onValueChange={handleSelect}
      className={cn('shrink-0', className)}
    />
  )
}
