'use client'

import { Accessibility, ALargeSmall, Contrast } from 'lucide-react'

import { DropdownMenu } from '@/components/ui/dropdown'

import { DropdownMenuContent } from './content'
import { DropdownMenuItem } from './item'
import { DropdownMenuTrigger } from './trigger'

export function PatientHeaderAccessibilityDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        variant='muted'
        size='icon'
        className='rounded-full [&_svg]:size-5'
      >
        <Accessibility />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <ALargeSmall /> Aumentar texto
        </DropdownMenuItem>

        <DropdownMenuItem>
          <ALargeSmall /> Diminuir texto
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Contrast /> Alto Contraste
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
