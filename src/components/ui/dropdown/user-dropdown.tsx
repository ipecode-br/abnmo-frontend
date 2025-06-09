'use client'

import { ChevronDown, LogOut, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown/dropdown'

import { DropdownMenuContent } from './content'
import { DropdownMenuItem } from './item'
import { DropdownMenuTrigger } from './trigger'

export function UserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label='Abrir menu do usuário'>
          <p className='text-sm font-medium'>Usuário</p>
          <ChevronDown />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent sideOffset={8}>
        <DropdownMenuItem>
          <User /> Perfil
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant='destructive'>
          <LogOut /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
