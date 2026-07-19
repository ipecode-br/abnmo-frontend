'use client'

import {
  CheckCircle2Icon,
  ClipboardPenIcon,
  EllipsisIcon,
  UserSquare2Icon,
  XCircleIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
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
  const router = useRouter()

  const canUpdateUser = canUser('update:user:others')
  const canActivateUser = canUser('activate:user')
  const canDeactivateUser = canUser('deactivate:user')

  const showActivateButton = canActivateUser && user.status === 'inactive'
  const showDeactivateButton = canDeactivateUser && user.status === 'active'
  const showStatusModal = canActivateUser || canDeactivateUser

  if (!canUpdateUser && !showStatusModal) {
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
          <MenuItem onClick={() => router.push(ROUTES.users.details(user.id))}>
            <UserSquare2Icon />
            Informações
          </MenuItem>

          {canUpdateUser && (
            <MenuItem onClick={() => setModalOpen('edit')}>
              <ClipboardPenIcon />
              Editar
            </MenuItem>
          )}

          {showActivateButton && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant='success'
                onClick={() => setModalOpen('status')}
              >
                <CheckCircle2Icon />
                Ativar
              </MenuItem>
            </>
          )}

          {showDeactivateButton && (
            <>
              <Divider className='my-1' />
              <MenuItem
                variant='destructive'
                onClick={() => setModalOpen('status')}
              >
                <XCircleIcon />
                Inativar
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

      {showStatusModal && (
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
