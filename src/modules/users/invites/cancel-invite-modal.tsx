'use client'

import { CircleXIcon } from 'lucide-react'
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
import { QUERY_CACHE_KEYS } from '@/constants/cache'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { api } from '@/lib/api'
import type { UserInvite } from '@/types/users'

interface CancelUserInviteModalProps {
  invite: UserInvite
  onClose: () => void
}

export function CancelUserInviteModal({
  invite,
  onClose,
}: Readonly<CancelUserInviteModalProps>) {
  const [isPending, startTransition] = useTransition()

  async function cancelUserInvite() {
    startTransition(async () => {
      const response = await api(`/users/invites/${invite.id}`, {
        method: 'DELETE',
      })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      revalidateClientCache(QUERY_CACHE_KEYS.users.invites)

      toast.success(response.message)
      onClose()
    })
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={CircleXIcon} variant='destructive' />}
      >
        <DialogTitle>Cancelar convite</DialogTitle>
      </DialogHeader>

      <DialogContent className='space-y-2'>
        <p>
          Você tem certeza que deseja cancelar o convite para{' '}
          <span className='font-semibold'>{invite.email}</span>?
        </p>
        <p>Este convite não poderá mais ser utilizado.</p>
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={isPending}
          variant='destructive'
          onClick={cancelUserInvite}
        >
          Cancelar convite
        </Button>
        <DialogClose className='flex-1' disabled={isPending}>
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
