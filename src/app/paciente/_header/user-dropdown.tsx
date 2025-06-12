'use client'

import { LogOutIcon, User2Icon } from 'lucide-react'

import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'

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
