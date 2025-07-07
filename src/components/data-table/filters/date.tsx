'use client'

import { cn } from '@/utils/class-name-merge'

import { Input } from '../../ui/input'
import { DataTableFilterContainer } from './container'

// TODO: implement date pickers
export function DataTableFilterDate({
  className,
  ...props
}: Readonly<React.ComponentProps<'div'>>) {
  return (
    <div className={cn('flex w-96 gap-2', className)} {...props}>
      <DataTableFilterContainer className='flex-1' title='Data inicial'>
        <Input placeholder='Data inicial' size='sm' />
      </DataTableFilterContainer>
      <DataTableFilterContainer className='flex-1' title='Data final'>
        <Input placeholder='Data final' size='sm' />
      </DataTableFilterContainer>
    </div>
  )
}
