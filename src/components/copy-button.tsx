'use client'

import { CopyIcon } from 'lucide-react'

import { useUtils } from '@/hooks/use-utils'
import { cn } from '@/utils/class-name-merge'

import { Button, ButtonProps } from './ui/button'

interface CopyButtonProps extends Omit<ButtonProps, 'value'> {
  value?: string | null
  message?: string
}

export function CopyButton({
  value,
  message,
  className,
  ...props
}: CopyButtonProps) {
  const { copyToClipboard } = useUtils()

  return (
    <Button
      variant='outline'
      onClick={() => copyToClipboard({ value, message })}
      className={cn('size-8 p-0 [&_svg]:size-4', className)}
      {...props}
    >
      <CopyIcon />
    </Button>
  )
}
