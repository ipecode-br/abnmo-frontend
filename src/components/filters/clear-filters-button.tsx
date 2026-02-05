'use client'

import { XIcon } from 'lucide-react'

import { Button, type ButtonProps } from '@/components/ui/button'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

export function ClearFiltersButton({
  className,
  ...props
}: Readonly<ButtonProps>) {
  const { clearParams, searchParams } = useParams()

  if (searchParams.size === 0) {
    return null
  }

  return (
    <Button
      size='sm'
      variant='muted'
      onClick={clearParams}
      className={cn('ml-auto', className)}
      {...props}
    >
      <XIcon />
      Limpar filtros
    </Button>
  )
}
