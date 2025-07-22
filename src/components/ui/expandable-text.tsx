'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utils/class-name-merge'

interface ExpandableTextProps {
  text: string
  maxLength?: number
  className?: string
}

export function ExpandableText({
  text,
  maxLength = 230,
  className,
}: Readonly<ExpandableTextProps>) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  if (text.length <= maxLength) {
    return (
      <div className={cn('break-words whitespace-pre-wrap', className)}>
        {text}
      </div>
    )
  }

  const collapsedText = (
    <div className='flex flex-col items-start'>
      <span>{`${text.substring(0, maxLength)}... `}</span>
      <Button variant='muted' onClick={toggleExpanded} className='mt-1 h-auto'>
        Ver mais...
      </Button>
    </div>
  )

  const expandedText = (
    <div className='flex flex-col items-start'>
      <span>{text}</span>
      <Button variant='ghost' onClick={toggleExpanded} className='mt-1 h-auto'>
        Ver menos...
      </Button>
    </div>
  )

  return (
    <div className={cn('break-words whitespace-pre-wrap', className)}>
      {isExpanded ? expandedText : collapsedText}
    </div>
  )
}
