'use client'

import { PhoneIcon } from 'lucide-react'

import { cn } from '@/utils/class-name-merge'
import { removeNonNumbers } from '@/utils/sanitizers'

import { Button, ButtonProps } from './ui/button'

interface CopyButtonProps extends Omit<ButtonProps, 'value'> {
  phone?: string | null
}

export function WhatsAppButton({
  phone,
  className,
  ...props
}: CopyButtonProps) {
  function handleClick() {
    if (!phone) return

    const normalized = removeNonNumbers(phone)
    const url = `https://api.whatsapp.com/send?phone=55${normalized}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      variant='outline'
      onClick={handleClick}
      className={cn('size-8 p-0 [&_svg]:size-4', className)}
      {...props}
    >
      <PhoneIcon />
    </Button>
  )
}
