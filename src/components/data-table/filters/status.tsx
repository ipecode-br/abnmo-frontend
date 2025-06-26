'use client'

import { Select, type SelectOptions, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select/content'
import { SelectItem } from '@/components/ui/select/item'
import { SelectTrigger } from '@/components/ui/select/trigger'
import { cn } from '@/utils/class-name-merge'

import {
  DataTableFilterContainer,
  type DataTableFilterContainerProps,
} from './container'

interface DataTableFilterStatusProps
  extends Omit<DataTableFilterContainerProps, 'title'> {
  statusOptions: SelectOptions
}

export function DataTableFilterStatus({
  statusOptions,
  className,
  ...props
}: Readonly<DataTableFilterStatusProps>) {
  return (
    <DataTableFilterContainer
      className={cn('w-48', className)}
      title='Status'
      {...props}
    >
      <Select>
        <SelectTrigger size='sm' className='w-full'>
          <SelectValue placeholder='Selecione o status' />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((filter) => (
            <SelectItem key={filter.value} value={filter.value}>
              {filter.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </DataTableFilterContainer>
  )
}
