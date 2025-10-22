'use client'

import React from 'react'

import { Button } from '@/components/ui/button'

type PatientRequirementCardProps = {
  title: string
  createdAt: string
  status: string
  imageUrl: string
}

export const PatientRequirementCard: React.FC<PatientRequirementCardProps> = ({
  title,
  createdAt,
  status,
  imageUrl,
}) => {
  const statusColors: Record<string, { bg: string; text: string }> = {
    Pendente: {
      bg: 'bg-[var(--color-warning)]/10',
      text: 'text-[var(--color-warning)]',
    },
    Aprovado: {
      bg: 'bg-[var(--color-success)]/10',
      text: 'text-[var(--color-success)]',
    },
    'Em análise': {
      bg: 'bg-[var(--color-primary)]/10',
      text: 'text-[var(--color-primary)]',
    },
  }

  const color = statusColors[status] || statusColors['Pendente']

  return (
    <div className='rounded-2xl bg-[var(--color-card)] p-4 shadow transition-all hover:shadow-md'>
      <img
        src={imageUrl}
        alt={title}
        className='mb-4 h-40 w-full rounded-xl object-cover'
      />

      <h3 className='text-lg font-semibold text-[var(--color-foreground)]'>
        {title}
      </h3>
      <p className='mt-1 text-sm text-[var(--color-foreground-soft)]'>
        Criado em: {createdAt}
      </p>

      <div className='mt-4 flex items-center justify-between'>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${color.bg} ${color.text}`}
        >
          {status}
        </span>

        <Button
          variant='default'
          size='sm'
          className='bg-[var(--color-primary)] text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-soft)]'
        >
          Preencher Agora
        </Button>
      </div>
    </div>
  )
}
