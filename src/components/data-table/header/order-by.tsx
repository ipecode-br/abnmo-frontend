'use client'

import type { SelectTriggerProps } from '@radix-ui/react-select'
import { ArrowDownWideNarrow } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Select,
  type SelectOptions,
  SelectValue as SelectValueComponent,
} from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select/content'
import { SelectItem } from '@/components/ui/select/item'
import { SelectItemReset } from '@/components/ui/select/item-reset'
import { SelectTrigger } from '@/components/ui/select/trigger'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderOrderByProps extends SelectTriggerProps {
  options: SelectOptions
  className?: string
}

export function DataTableHeaderOrderBy({
  options,
  className,
  ...props
}: Readonly<DataTableHeaderOrderByProps>) {
  const { getParam, updateParams, searchParams } = useParams()
  const [value, setValue] = useState(getParam(QUERY_PARAMS.orderBy) || '')

  useEffect(() => {
    setValue(getParam(QUERY_PARAMS.orderBy) || '')
  }, [searchParams])

  function handleSelect(newValue: string) {
    if (newValue === 'reset') {
      updateParams({ remove: [QUERY_PARAMS.orderBy] })
    } else {
      updateParams({ set: [{ key: QUERY_PARAMS.orderBy, value: newValue }] })
    }
  }

  return (
    <Select value={value} onValueChange={handleSelect}>
      <SelectTrigger size='sm' className={cn('shrink-0', className)} {...props}>
        <ArrowDownWideNarrow />
        <SelectValueComponent placeholder='Ordenar por...' />
      </SelectTrigger>
      <SelectContent>
        {options.map((filter) => (
          <SelectItem key={filter.value} value={filter.value}>
            {filter.label}
          </SelectItem>
        ))}

        {value && (
          <SelectItem value='reset'>
            <SelectItemReset title='Limpar ordem' />
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
