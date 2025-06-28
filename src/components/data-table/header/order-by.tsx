'use client'

import type { SelectTriggerProps } from '@radix-ui/react-select'
import { ArrowDownWideNarrow, XIcon } from 'lucide-react'

import { Divider } from '@/components/ui/divider'
import { Select, type SelectOptions, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select/content'
import { SelectItem } from '@/components/ui/select/item'
import { SelectTrigger } from '@/components/ui/select/trigger'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderOrderByProps extends SelectTriggerProps {
  options: SelectOptions
}

export function DataTableHeaderOrderBy({
  options,
  className,
  ...props
}: Readonly<DataTableHeaderOrderByProps>) {
  const { getParam, updateParams } = useParams()

  const orderByParam = QUERY_PARAMS.orderBy
  const orderBy = getParam(orderByParam) || ''

  function handleSelect(value: string) {
    if (value === 'reset') {
      updateParams({ remove: [orderByParam] })
      return
    }

    updateParams({ set: [{ key: orderByParam, value: value }] })
  }

  return (
    <Select value={orderBy} onValueChange={handleSelect}>
      <SelectTrigger size='sm' className={cn('shrink-0', className)} {...props}>
        <ArrowDownWideNarrow />
        <SelectValue placeholder='Ordenar por...' />
      </SelectTrigger>
      <SelectContent>
        {options.map((filter) => (
          <SelectItem key={filter.value} value={filter.value}>
            {filter.label}
          </SelectItem>
        ))}
        <Divider className='my-2' />
        <SelectItem value='reset'>
          <div className='flex items-center gap-2 [&_svg]:size-4'>
            <XIcon />
            Limpar ordem
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
