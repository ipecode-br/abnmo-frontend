'use client'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface FontSizeCardProps {
  sizeLabel: string
  textDisplayClass?: string
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

export function FontSizeCard({
  sizeLabel,
  textDisplayClass,
  isSelected = false,
  onClick,
  className,
}: FontSizeCardProps) {
  return (
    <Button
      variant='ghost'
      asChild
      className={twMerge(
        'focus-visible:ring-offset-background group ring-offset-background focus-visible:ring-ring relative w-fit rounded-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        isSelected && 'ring-primary ring-2 ring-offset-2',
      )}
      onClick={onClick}
    >
      <Card
        className={twMerge(
          'flex size-36 flex-col items-center justify-center gap-1 px-3 py-4 transition-colors',
          isSelected && 'border-primary',
          className,
        )}
      >
        <p
          className={twMerge(
            'text-foreground-soft font-semibold',
            textDisplayClass,
          )}
        >
          Tt
        </p>
        <span
          className={twMerge(
            'text-foreground-soft font-normal',
            textDisplayClass,
          )}
        >
          {sizeLabel}
        </span>
      </Card>
    </Button>
  )
}
