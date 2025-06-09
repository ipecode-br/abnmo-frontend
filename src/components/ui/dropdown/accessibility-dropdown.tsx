'use client'

import { Accessibility, ALargeSmall, Contrast } from 'lucide-react'

import { DropdownMenu } from '@/components/ui/dropdown/dropdown'
import { cn } from '@/utils/class-name-merge'

import { buttonVariants } from '../button'
import { DropdownMenuContent } from './content'
import { DropdownMenuItem } from './item'
import { DropdownMenuTrigger } from './trigger'

export function AccessibilityDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: 'muted', size: 'icon' }),
          'rounded-full',
        )}
      >
        <Accessibility />
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={8}>
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
