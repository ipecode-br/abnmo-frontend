'use client'

import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import {
  AccessibilityIcon,
  ALargeSmallIcon,
  ContrastIcon,
} from '@/components/ui/icons'

export function PatientHeaderAccessibilityDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        variant='muted'
        size='icon'
        className='rounded-full [&_svg]:size-5'
        indicator={false}
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
