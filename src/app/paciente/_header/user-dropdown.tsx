'use client'

import { Loader2Icon, LogOutIcon, User2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Avatar } from '@/components/ui/avatar'
import { Divider } from '@/components/ui/divider'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownMenuContent } from '@/components/ui/dropdown/content'
import { DropdownMenuItem } from '@/components/ui/dropdown/item'
import { DropdownMenuTrigger } from '@/components/ui/dropdown/trigger'
import { ROUTES } from '@/constants/routes'
import { api } from '@/lib/api'
import type { UserType } from '@/types/users'

interface PatientHeaderUserDropdownProps {
  user: UserType
}

export function PatientHeaderUserDropdown({
  user,
}: Readonly<PatientHeaderUserDropdownProps>) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [firstName] = user.name.split(' ')

  async function logout() {
    startTransition(async () => {
      const response = await api('/logout', { method: 'POST' })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)
      router.replace(ROUTES.auth.signIn)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label='Abrir menu'
        className='rounded-full pl-1'
        indicator
      >
        <Avatar src={user.avatar_url} className='size-8 [&_svg]:size-4' />
        {firstName}
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <User2Icon /> Perfil
        </DropdownMenuItem>

        <Divider />

        <DropdownMenuItem onClick={logout} disabled={isPending}>
          {isPending ? (
            <Loader2Icon className='animate-spin' />
          ) : (
            <LogOutIcon />
          )}
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
