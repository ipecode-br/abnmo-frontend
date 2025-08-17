'use client'

import { EllipsisVerticalIcon, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { revalidateCache } from '@/actions/cache'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { NEXT_CACHE_TAGS } from '@/constants/cache'
import { ROUTES } from '@/constants/routes'
import { USER_ROLES } from '@/constants/users'
import { api } from '@/lib/api'
import { useSidebar } from '@/store/sidebar'
import type { UserType } from '@/types/users'

interface SidebarAccountProps {
  user: UserType
}

// TODO: add popover menu
export function SidebarAccount({ user }: Readonly<SidebarAccountProps>) {
  const expanded = useSidebar((state) => state.expanded)
  const router = useRouter()

  async function logout() {
    const response = await api('/logout', { method: 'POST' })

    if (!response.success) {
      toast.error(response.message)
      return
    }

    revalidateCache(NEXT_CACHE_TAGS.user(user.id))
    toast.success(response.message)
    router.push(ROUTES.auth.signIn)
  }

  return (
    <>
      <Button variant='ghost' className='justify-start' onClick={logout}>
        <LogOutIcon />
        Sair
      </Button>

      <Divider />

      <div className='relative flex items-center gap-3'>
        <Avatar src={user?.avatar_url} />

        {user ? (
          <div
            data-visible={expanded}
            className='space-y-1 truncate opacity-0 transition-opacity duration-750 data-[visible=true]:opacity-100'
          >
            <p className='truncate text-sm whitespace-nowrap'>{user.name}</p>
            <p className='text-foreground-soft text-xs'>
              {USER_ROLES[user.role]}
            </p>
          </div>
        ) : (
          <p className='text-xs'>Usuário não encontrado</p>
        )}

        <Button
          size='icon'
          variant='ghost'
          data-visible={expanded}
          className='absolute right-0 ml-auto opacity-0 transition-opacity duration-500 data-[visible=true]:opacity-100 data-[visible=true]:delay-200'
        >
          <EllipsisVerticalIcon className='text-foreground-soft' />
        </Button>
      </div>
    </>
  )
}
