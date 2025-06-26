'use client'

import { SearchIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

import { Input, type InputProps } from '../../ui/input'

// TODO: implement search functionality
export function DataTableHeaderSearch({
  className,
  ...props
}: Readonly<InputProps>) {
  return (
    <Input
      size='sm'
      icon={SearchIcon}
      className={cn('w-48', className)}
      {...props}
    />
  )
}
