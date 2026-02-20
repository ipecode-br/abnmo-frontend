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
  const [modalOpen, setModalOpen] = useState<InviteModalMode | null>(null)
  const { canUser } = usePermissions()

  const canCancelInvite = canUser('delete', 'Invites')

  if (!canCancelInvite) {
    return null
  }

  return (
    <>
      <Menu>
        <MenuTrigger size='icon_sm' variant='ghost' aria-label='Abrir ações'>
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem
            variant='destructive'
            onClick={() => setModalOpen('cancel')}
          >
            <CircleXIcon />
            Cancelar
          </MenuItem>
        </MenuContent>
      </Menu>

      {modalOpen === 'cancel' && (
        <Dialog
          open={modalOpen === 'cancel'}
          onOpenChange={(open) => setModalOpen(open ? 'cancel' : null)}
        >
          <CancelUserInviteModal
            invite={invite}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}
    </>
  )
}
