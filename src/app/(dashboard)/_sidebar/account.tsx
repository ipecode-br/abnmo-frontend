'use client'

import { useQuery } from '@tanstack/react-query'
import { EllipsisVerticalIcon } from 'lucide-react'

import { getProfile } from '@/actions/users'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { USER_ROLES } from '@/constants/users'
import { useSidebar } from '@/store/sidebar'

// TODO: add popover menu
export function SidebarAccount() {
  const expanded = useSidebar((state) => state.expanded)

  const { data: user, isLoading } = useQuery({
    queryKey: [QUERY_CACHE_KEYS.profile],
    queryFn: getProfile,
  })

  if (isLoading) {
    return (
      <div className='flex items-center gap-3'>
        <Skeleton className='size-10 rounded-full' />

        <div className='flex-1 space-y-1 truncate'>
          <Skeleton className='h-5 w-10/12' />
          <Skeleton className='h-4 w-8/12' />
        </div>
      </div>
    )
  }

  return (
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
  )
}
