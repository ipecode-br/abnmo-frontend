'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { revalidateCache } from '@/actions/cache'
import { getDataFromToken } from '@/actions/token'
import { Avatar } from '@/components/ui/avatar'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { EllipsisVerticalIcon, LogOutIcon } from '@/components/ui/icons'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import { useSidebar } from '@/store/sidebar'
import type { UserType } from '@/types/users'

interface SidebarAccountProps {
  user: UserType
}

export function SidebarAccount({ user }: Readonly<SidebarAccountProps>) {
  const [isPending, startTransition] = useTransition()

  const expanded = useSidebar((state) => state.expanded)
  const router = useRouter()

  async function logout() {
    startTransition(async () => {
      const data = await getDataFromToken()

      if (!data?.userId) return

      const response = await api('/logout', { method: 'POST' })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      revalidateCache(NEXT_CACHE_TAGS.user(data.userId))
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
        <p className='truncate text-sm whitespace-nowrap'>{user.name}</p>
        <p className='text-foreground-soft truncate text-xs'>{user.email}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          size='icon'
          variant='ghost'
          data-visible={expanded}
          aria-label='Abrir menu'
          className='absolute right-0 ml-auto size-10 opacity-0 transition-opacity duration-500 data-[visible=true]:size-8 data-[visible=true]:opacity-100 data-[visible=true]:delay-200'
        >
          <EllipsisVerticalIcon className='text-foreground-soft' />
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start' sideOffset={8} className='min-w-32'>
          <DropdownMenuItem onClick={logout} disabled={isPending}>
            <LogOutIcon />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
