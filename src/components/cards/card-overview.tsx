'use client'

import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/utils/class-name-merge'

type CardOverviewProps = {
  title: string
  description?: string
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

export function CardOverview({
  title,
  description,
  icon,
  children,
  className,
}: Readonly<CardOverviewProps>) {
  return (
    <Card
      className={cn(
        'flex flex-col gap-4 bg-[var(--color-primary)] p-6 text-[var(--color-primary-foreground)]',
        className,
      )}
    >
      <header className='flex items-center gap-3'>
        {icon && <div className='text-primary-foreground'>{icon}</div>}
        <h2 className='text-lg font-semibold'>{title}</h2>
      </header>

      {description && <p className='text-sm opacity-90'>{description}</p>}

      {children && <div className='flex-1'>{children}</div>}
    </Card>
  )
}
