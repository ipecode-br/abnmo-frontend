'use client'

import type { SelectTriggerProps } from '@radix-ui/react-select'
import { ArrowDownWideNarrow } from 'lucide-react'

import { Select, type SelectOptions, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select/content'
import { SelectItem } from '@/components/ui/select/item'
import { SelectTrigger } from '@/components/ui/select/trigger'
import { cn } from '@/utils/class-name-merge'

interface DataTableHeaderOrderProps extends SelectTriggerProps {
  options: SelectOptions
}

// TODO: implement order functionality
export function DataTableHeaderOrder({
  options,
  className,
  ...props
}: Readonly<DataTableHeaderOrderProps>) {
  return (
    <Select>
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
      </SelectContent>
    </Select>
  )
}
