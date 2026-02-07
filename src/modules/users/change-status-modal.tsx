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

  const actionToPerfom = user.status === 'active' ? 'inactivate' : 'activate'

  const actionContent = {
    inactivate: {
      icon: CircleXIcon,
      action: 'Inativar',
      result: 'perderá o',
      variant: 'destructive',
    },
    activate: {
      icon: CircleCheckIcon,
      action: 'Ativar',
      result: 'terá',
      variant: 'success',
    },
  } as const

  const selectedAction = actionContent[actionToPerfom]

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
        icon={
          <DialogIcon
            icon={selectedAction.icon}
            variant={selectedAction.variant}
          />
        }
      >
        <DialogTitle>{selectedAction.action} usuário</DialogTitle>
      </DialogHeader>

      <DialogContent className='space-y-2'>
        <p>
          Você tem certeza que deseja {selectedAction.action.toLowerCase()} o
          usuário <span className='font-semibold'>{user.name}</span>?
        </p>
        <p>
          Ao confirmar, este usuário {selectedAction.result} acesso ao sistema.
        </p>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={isPending}
          variant={selectedAction.variant}
          onClick={changeUserStatus}
        >
          {selectedAction.action}
        </Button>
        <DialogClose className='flex-1' disabled={isPending}>
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
