'use client'

import type { ReactNode } from 'react'

import { cn } from '@/utils/class-name-merge'

interface DashboardOverviewProps {
  readonly title?: string
  readonly description?: string
  readonly className?: string
  readonly children?: ReactNode
}

export default function DashboardOverview({
  title = 'Visão Geral',
  description = 'Esta é uma visão geral do sistema para gerenciar os atendimentos.',
  className,
  children,
}: DashboardOverviewProps) {
  return (
    <div
      className={cn(
        'text-primary-foreground max-h-35 min-h-25 space-y-2 rounded-2xl bg-[#31c48e] p-6',
        className,
      )}
    >
      <h2 className='text-xl leading-tight font-semibold'>{title}</h2>
      <p className='text-sm leading-snug'>{description}</p>
      {children}
    </div>
  )
}
