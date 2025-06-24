'use client'

import { ListFilterIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'

export function DataTableHeaderFilterButton(props: Readonly<ButtonProps>) {
  return (
    <Button variant='outline' size='sm' {...props}>
      <ListFilterIcon />
      Filtros
    </Button>
  )
}
