'use client'

import { type LucideIcon } from 'lucide-react'

import { Select, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@/components/ui/select/content'
import { SelectItem } from '@/components/ui/select/item'
import { SelectItemReset } from '@/components/ui/select/item-reset'
import { SelectTrigger } from '@/components/ui/select/trigger'
import { QUERY_PARAMS } from '@/constants/params'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

import {
  DataTableFilterContainer,
  type DataTableFilterContainerProps,
} from './container'

type StatusOption = {
  label: string
  value: string
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
      <Select value={status} onValueChange={handleSelect}>
        <SelectTrigger size='sm' className='w-full'>
          <SelectValue placeholder='Selecione o status' />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value, icon: Icon, color }) => (
            <SelectItem key={value} value={value}>
              <div
                className={cn(
                  '[&_svg]:group-focus:text-primary-foreground flex items-center gap-2',
                  color,
                )}
              >
                {Icon && <Icon />}
                {label}
              </div>
            </SelectItem>
          ))}

          {status && <SelectItemReset title='Limpar status' />}
        </SelectContent>
      </Select>
    </DataTableFilterContainer>
  )
}
