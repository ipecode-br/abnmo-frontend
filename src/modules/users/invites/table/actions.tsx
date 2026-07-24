'use client'

import { CircleXIcon, EllipsisIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { usePermissions } from '@/hooks/use-permissions'
import type { UserInvite } from '@/types/users'

import { CancelUserInviteModal } from '../cancel-invite-modal'

type InviteModalMode = 'cancel'

interface UserInvitesTableActionsProps {
  invite: UserInvite
}

export function UserInvitesTableActions({
  invite,
}: Readonly<UserInvitesTableActionsProps>) {
  const [modelMode, setModalMode] = useState<InviteModalMode | null>(null)
  const { canUser } = usePermissions()

  const canCancelInvite = canUser('delete:user-invite')

  if (!canCancelInvite) {
    return null
  }

  return (
    <>
      <Menu>
        <MenuTrigger
          variant='ghost'
          className='size-8'
          aria-label='Abrir ações'
        >
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem
            variant='destructive'
            onClick={() => setModalMode('cancel')}
          >
            <CircleXIcon />
            Cancelar
          </MenuItem>
        </MenuContent>
      </Menu>

      {canCancelInvite && (
        <Dialog
          open={modelMode === 'cancel'}
          onOpenChange={(open) => setModalMode(open ? 'cancel' : null)}
        >
          {modelMode === 'cancel' && (
            <CancelUserInviteModal
              invite={invite}
              onClose={() => setModalMode(null)}
            />
          )}
        </Dialog>
      )}
    </>
  )
}
