'use client'

import { CircleCheckIcon, CircleXIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'
import type { User } from '@/types/users'

interface ChangeUserStatusModalModalProps {
  user: User
  onClose: () => void
}

export function ChangeUserStatusModal({
  user,
  onClose,
}: Readonly<ChangeUserStatusModalModalProps>) {
  const [isPending, startTransition] = useTransition()

  const actionToPerfom = user.status === 'active' ? 'deactivate' : 'activate'

  const actionsContent = {
    deactivate: {
      icon: CircleXIcon,
      label: 'Inativar',
      result: 'perderá o',
      variant: 'destructive',
    },
    activate: {
      icon: CircleCheckIcon,
      label: 'Ativar',
      result: 'terá',
      variant: 'success',
    },
  } as const

  const action = actionsContent[actionToPerfom]

  async function changeUserStatus() {
    startTransition(async () => {
      const response = await api(`/users/${user.id}/${actionToPerfom}`, {
        method: 'PATCH',
      })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      revalidateClientCache(QUERY_CACHE_KEYS.users.main)
      revalidateServerCache(NEXT_CACHE_TAGS.user(user.id))

      toast.success(response.message)
      onClose()
    })
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={action.icon} variant={action.variant} />}
      >
        <DialogTitle>{action.label} usuário</DialogTitle>
      </DialogHeader>

      <DialogContent className='space-y-2'>
        <p>
          Você tem certeza que deseja {action.label.toLowerCase()} o usuário{' '}
          <span className='font-semibold'>{user.name}</span>?
        </p>
        <p>Ao confirmar, este usuário {action.result} acesso ao sistema.</p>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={isPending}
          variant={action.variant}
          onClick={changeUserStatus}
        >
          {action.label}
        </Button>
        <DialogClose className='flex-1' disabled={isPending}>
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
