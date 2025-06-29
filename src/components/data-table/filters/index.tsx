'use client'

import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useParams } from '@/hooks/params'
import { cn } from '@/utils/class-name-merge'

interface DataTableFiltersProps extends React.ComponentProps<'section'> {
  queries: string[]
}

export function DataTableFilters({
  queries,
  className,
  children,
  ...props
}: Readonly<DataTableFiltersProps>) {
  const { updateParams } = useParams()

  return (
    <section className={cn('flex items-end gap-8', className)} {...props}>
      {children}

      <Button
        size='sm'
        variant='muted'
        className='ml-auto'
        onClick={() => updateParams({ remove: queries })}
      >
        <XIcon />
        Limpar filtros
      </Button>
    </section>
  )
}
