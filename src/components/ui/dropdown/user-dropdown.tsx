// components/ScreeningDropdown() {.tsx
'use client'

import { ChevronDown, LogOut, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown/dropdown'
import { cn } from '@/utils/class-name-merge'

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label='Abrir menu do usuário'
          className='border-border flex cursor-pointer items-center justify-center gap-1 rounded-full border px-2.5 py-2'
        >
          <p className='text-sm'>Usuário</p>
          <ChevronDown color='black' className='h-4 w-4' />
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
          <User className='h-4 w-4' /> Perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant='destructive'
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm text-red-500 focus:bg-red-50 focus:text-red-500',
          )}
        >
          <LogOut className='h-4 w-4' /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
