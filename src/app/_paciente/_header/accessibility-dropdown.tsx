'use client'

import { AccessibilityIcon, ALargeSmallIcon, ContrastIcon } from 'lucide-react'

import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

export function PatientHeaderAccessibilityDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        variant='muted'
        indicator={false}
        className='size-10 rounded-full [&_svg]:size-5'
      >
        <AccessibilityIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <ALargeSmallIcon /> Aumentar texto
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ALargeSmallIcon /> Diminuir texto
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ContrastIcon /> Alto Contraste
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
