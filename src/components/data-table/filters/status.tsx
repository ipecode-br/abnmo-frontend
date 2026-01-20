'use client'

import { type LucideIcon } from 'lucide-react'

import { Select, type SelectOption } from '@/components/ui/select'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

import {
  DataTableFilterContainer,
  type DataTableFilterContainerProps,
} from './container'

type StatusOption = SelectOption & {
  icon?: LucideIcon
  color?: string
}

interface DataTableFilterStatusProps
  extends Omit<DataTableFilterContainerProps, 'title'> {
  options: StatusOption[]
}

export function DataTableFilterStatus({
  options,
  className,
  ...props
}: Readonly<DataTableFilterStatusProps>) {
  const { getParam, updateParams } = useParams()

  const pageParam = QUERY_PARAMS.page
  const statusParam = QUERY_PARAMS.status
  const status = getParam(statusParam) || ''

  function handleSelect(value: string) {
    if (value === 'reset') {
      updateParams({ remove: [statusParam, pageParam] })
      return
    }

    updateParams({
      set: [{ key: statusParam, value: value }],
      remove: [pageParam],
    })
  }

  return (
    <DataTableFilterContainer
      title='Status'
      className={cn('w-48 shrink-0', className)}
      {...props}
    >
      <Select
        value={status}
        onValueChange={handleSelect}
        options={options}
        placeholder='Selecione o status'
        className='w-full'
      />
    </DataTableFilterContainer>
  )
}
