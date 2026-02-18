'use client'

import { EllipsisVerticalIcon, LogOutIcon, UserCircle2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { logout } from '@/actions/auth/logout'
import { Avatar } from '@/components/ui/avatar'
import { ROUTES } from '@/constants/routes'
import { useSidebar } from '@/store/sidebar'
import type { User } from '@/types/users.d.ts'

import { Divider } from '../ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../ui/menu'

interface SidebarAccountProps {
  user?: User | null
}

export function SidebarAccount({ user }: Readonly<SidebarAccountProps>) {
  const expanded = useSidebar((state) => state.expanded)
  const router = useRouter()

  return (
    <div className='relative flex items-center gap-3'>
      <Avatar src={user?.avatar_url} />

      <div
        data-visible={expanded}
        className='space-y-1 truncate pr-8 opacity-0 transition-opacity duration-750 data-[visible=true]:opacity-100'
      >
        <p className='truncate text-sm whitespace-nowrap'>{user?.name}</p>
        <p className='text-foreground-soft truncate text-xs'>{user?.email}</p>
      </div>

      <Menu>
        <MenuTrigger
          size='icon_sm'
          variant='ghost'
          data-visible={expanded}
          aria-label='Abrir menu'
          className='absolute right-0 ml-auto opacity-0 transition-opacity duration-500 data-[visible=true]:opacity-100 data-[visible=true]:delay-200'
        >
          <EllipsisVerticalIcon className='text-foreground-soft' />
        </MenuTrigger>
        <MenuContent sideOffset={8} className='min-w-32'>
          <MenuItem onClick={() => router.push(ROUTES.dashboard.profile)}>
            <UserCircle2Icon />
            Meu perfil
          </MenuItem>
          <Divider className='my-1' />
          <MenuItem onClick={logout}>
            <LogOutIcon />
            Sair
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}
