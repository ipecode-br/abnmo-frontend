'use client'

import { LogOutIcon, User2Icon } from 'lucide-react'

import { DropdownMenu } from '@/components/ui/dropdown'

import { Divider } from '../divider'
import { DropdownMenuContent } from './content'
import { DropdownMenuItem } from './item'
import { DropdownMenuTrigger } from './trigger'

export function PatientHeaderUserDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label='Abrir menu'
        className='rounded-full'
        indicator
      >
        Usuário
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <User2Icon /> Perfil
        </DropdownMenuItem>

        <Divider />

        <DropdownMenuItem>
          <LogOutIcon /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
