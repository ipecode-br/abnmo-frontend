'use client'

import Image from 'next/image'
import React from 'react'

import { Button } from '@/components/ui/button'

type PatientRequirementCardProps = {
  title: string
  createdAt: string
  status: string
  imageUrl: string
}

export function PatientRequirementCard({
  title,
  createdAt,
  status,
  imageUrl,
}: PatientRequirementCardProps) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    Pendente: {
      bg: 'bg-warning/10',
      text: 'text-warning',
    },
    Aprovado: {
      bg: 'bg-success/10',
      text: 'text-success',
    },
    'Em análise': {
      bg: 'bg-primary/10',
      text: 'text-primary',
    },
  }

  const color = statusColors[status] || statusColors['Pendente']

  return (
    <div className='bg-card rounded-2xl p-4 shadow transition-all hover:shadow-md'>
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={160}
        className='mb-4 h-40 w-full rounded-xl object-cover'
      />

      <h3 className='text-foreground text-lg font-semibold'>{title}</h3>
      <p className='text-foreground-soft mt-1 text-sm'>
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
          className='bg-primary text-primary-foreground hover:bg-primary-soft transition-colors'
        >
          Preencher Agora
        </Button>
      </div>
    </div>
  )
}
