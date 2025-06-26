'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'

export function DataTableFilters({
  className,
  children,
  ...props
}: Readonly<React.ComponentProps<'section'>>) {
  return (
    <section className={cn('flex items-end gap-8', className)} {...props}>
      {children}

      <Button size='sm' variant='muted' className='ml-auto'>
        <XIcon />
        Limpar filtros
      </Button>
    </section>
  )
}
