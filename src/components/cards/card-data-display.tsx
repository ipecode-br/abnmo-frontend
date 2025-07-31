'use client'

import { ReactNode } from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/utils/class-name-merge'

type CardDataDisplayProps = {
  title: string | ReactNode
  value: string | number
  icon?: ReactNode
  className?: string
}

export function CardDataDisplay({
  title,
  value,
  icon,
  className,
}: Readonly<CardDataDisplayProps>) {
  return (
    <Card
      className={cn(
        'relative flex flex-col items-start rounded-2xl border border-gray-200 bg-white p-4 shadow-md',
        'animate-fade-in-up transition-all duration-300 hover:scale-[1.03] hover:shadow-lg',
        className,
      )}
    >
      {icon && (
        <div className='absolute top-4 right-4 text-gray-500'>{icon}</div>
      )}

      <h3 className='text-3xl font-bold text-gray-900'>{value}</h3>

      <div className='mt-1 text-xs text-gray-700'>{title}</div>
    </Card>
  )
}
