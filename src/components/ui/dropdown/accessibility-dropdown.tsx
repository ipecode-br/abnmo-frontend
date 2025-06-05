// components/ScreeningDropdown() {.tsx
'use client'

import { Accessibility, ALargeSmall, Contrast } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/dropdown'
import { cn } from '@/utils/class-name-merge'

{
  /* className='hover:bg-muted rounded-full border' */
}

export function AccessibilityDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label='Acessibilidade'
          className='bg-background-soft text-accent-foreground hover:bg-accent flex h-10 w-10 cursor-pointer items-center justify-center rounded-full px-2.5 py-2'
        >
          <Accessibility color='#656565' className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='z-50 mr-5 min-w-[180px] rounded-md border bg-white p-2 shadow-md'
        sideOffset={8}
      >
        <DropdownMenuItem
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm',
          )}
        >
          <ALargeSmall className='h-4 w-4' /> Aumentar texto
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm',
          )}
        >
          <ALargeSmall className='h-4 w-4' /> Diminuir texto
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm',
          )}
        >
          <Contrast className='h-4 w-4' /> Alto Contraste
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
