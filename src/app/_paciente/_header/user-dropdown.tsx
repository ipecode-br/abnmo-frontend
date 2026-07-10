'use client'

import { Loader2Icon, LogOutIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import type { User } from '@/types/users.d.ts'

interface PatientHeaderUserDropdownProps {
  user: User
}

export function PatientHeaderUserDropdown({
  user,
}: Readonly<PatientHeaderUserDropdownProps>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [firstName] = user.name.split(' ')

  async function logout() {
    startTransition(async () => {
      api('/logout', { method: 'POST' })

      router.replace(ROUTES.auth.signIn)
    })
  }

  return (
    <Menu>
      <MenuTrigger aria-label='Abrir menu' className='rounded-full pl-1'>
        <Avatar src={user.avatarUrl} className='size-8 [&_svg]:size-4' />
        {firstName}
      </MenuTrigger>

      <MenuContent align='end'>
        <MenuItem>
          <User2Icon /> Perfil
        </MenuItem>

        <Divider />

        <MenuItem onClick={logout} disabled={isPending}>
          {isPending ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <LogOutIcon />
          )}
          Sair
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
