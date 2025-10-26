'use client'

import { ListFilterIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'

export function DataTableHeaderFilterButton({
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <Button
      size='sm'
      variant='outline'
      className={cn('[&_svg]:text-disabled', className)}
      {...props}
    >
      <ListFilterIcon />
      Filtros
    </Button>
  )
}
