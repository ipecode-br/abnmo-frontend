'use client'

import { CircleXIcon, EllipsisIcon } from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
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

  return (
    <>
      <Menu>
        <MenuTrigger size='icon' variant='ghost' className='size-8'>
          <EllipsisIcon />
          <span className='sr-only'>Ações</span>
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
