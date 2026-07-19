'use client'

import {
  CheckCircle2Icon,
  ClipboardPenIcon,
  EllipsisIcon,
  XCircleIcon,
} from 'lucide-react'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { usePermissions } from '@/hooks/use-permissions'
import type { User } from '@/types/users'

import { ChangeUserStatusModal } from '../change-status-modal'
import { UpdateUserModal } from '../update-modal'

type UserModalMode = 'view' | 'edit' | 'status'

interface UsersTableActionsProps {
  user: User
}

export function UsersTableActions({ user }: Readonly<UsersTableActionsProps>) {
  const [modalOpen, setModalOpen] = useState<UserModalMode | null>(null)
  const { canUser } = usePermissions()

  const canUpdateUser = canUser('update:user')
  const canDeleteUser = canUser('deactivate:user')

  const changingStatusData = {
    active: {
      variant: 'destructive',
      icon: <XCircleIcon />,
      label: 'Inativar',
    },
    inactive: {
      variant: 'success',
      icon: <CheckCircle2Icon />,
      label: 'Ativar',
    },
  } as const

  const statusButton =
    changingStatusData[user.status === 'pending' ? 'active' : user.status]

  if (!canUpdateUser && !canDeleteUser) {
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
          {canUpdateUser && (
            <MenuItem onClick={() => setModalOpen('edit')}>
              <ClipboardPenIcon />
              Editar
            </MenuItem>
          )}

          {/* <MenuItem
            onClick={() => router.push(ROUTES.users.details(user.id))}
          >
            <UserSquare2Icon />
            Informações do usuário
          </MenuItem> */}

          {canDeleteUser && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant={statusButton.variant}
                onClick={() => setModalOpen('status')}
              >
                {statusButton.icon}
                {statusButton.label}
              </MenuItem>
            </>
          )}
        </MenuContent>
      </Menu>

      {canUpdateUser && (
        <Dialog
          open={modalOpen === 'edit'}
          onOpenChange={(open) => setModalOpen(open ? 'edit' : null)}
        >
          <UpdateUserModal user={user} onClose={() => setModalOpen(null)} />
        </Dialog>
      )}

      {canDeleteUser && (
        <Dialog
          open={modalOpen === 'status'}
          onOpenChange={(open) => setModalOpen(open ? 'status' : null)}
        >
          <ChangeUserStatusModal
            user={user}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}
    </>
  )
}
