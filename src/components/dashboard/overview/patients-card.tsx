'use client'

import { CheckCircleIcon, Users, XCircleIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'

interface DashboardCardProps {
  readonly title: string
  readonly value: number
  readonly variant?: 'default' | 'active' | 'inactive'
}

function HighlightSpecificWords({
  title,
  highlightWords,
}: Readonly<{
  title: string
  highlightWords?: readonly string[]
}>) {
  const words = title.split(' ')

  return (
    <h3 className='font-inter mt-8 text-sm font-medium uppercase'>
      {words.map((word, index) => {
        const upperWord = word.toUpperCase()
        const isHighlighted = highlightWords?.includes(upperWord)
        const key = `${word}-${index}`

        return (
          <span
            key={key}
            className={cn(
              isHighlighted ? 'font-semibold text-gray-700' : 'text-gray-500',
            )}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </h3>
  )
}

export function DashboardOverviewPatientsCard({
  title,
  value,
  variant = 'default',
}: Readonly<DashboardCardProps>) {
  const iconBase =
    'rounded-[12px] border p-4 shadow-sm border-[#DCDCDC] text-[#0A0D14] min-h-20 max-h-35 font-inter font-medium'
  const iconStyles = 'w-10 h-10 p-2 rounded-full border border-[#DCDCDC]'

  const variants = {
    default: {
      icon: <Users className={cn(iconStyles, 'text-[#00ce83]')} />,
      highlightWords: ['TOTAL'] as string[],
    },
    active: {
      icon: <CheckCircleIcon className={cn(iconStyles, 'text-[#38C793]')} />,
      highlightWords: ['ATIVOS'],
    },
    inactive: {
      icon: <XCircleIcon className={cn(iconStyles, 'text-[#DF1C41]')} />,
      highlightWords: ['INATIVOS'],
    },
  }

  return (
    <div className={iconBase}>
      <div className='flex items-start justify-between'>
        <span className='text-2xl font-bold'>{value}</span>
        {variants[variant].icon}
      </div>
      <HighlightSpecificWords
        title={title}
        highlightWords={variants[variant].highlightWords}
      />
    </div>
  )
}
