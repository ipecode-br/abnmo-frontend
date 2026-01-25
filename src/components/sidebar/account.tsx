'use client'

import { EllipsisVerticalIcon, LogOutIcon, UserCircle2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { revalidateCache } from '@/actions/cache'
import { Avatar } from '@/components/ui/avatar'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import { useSidebar } from '@/store/sidebar'
import type { User } from '@/types/users.d.ts'

import { Divider } from '../ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '../ui/menu'

interface SidebarAccountProps {
  user?: User | null
}

export function SidebarAccount({ user }: Readonly<SidebarAccountProps>) {
  const [isPending, startTransition] = useTransition()

  const expanded = useSidebar((state) => state.expanded)
  const router = useRouter()

  async function logout() {
    startTransition(async () => {
      if (!user?.id) return

      const response = await api('/logout', { method: 'POST' })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      revalidateCache(NEXT_CACHE_TAGS.user(user.id))
      toast.success(response.message)
      router.push(ROUTES.auth.signIn)
    })
  }

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
            Perfil
          </MenuItem>
          <Divider className='my-1' />
          <MenuItem onClick={logout} disabled={isPending}>
            <LogOutIcon />
            Sair
          </MenuItem>
        </MenuContent>
      </Menu>
    </div>
  )
}
