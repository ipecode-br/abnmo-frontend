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
import type { User } from '@/types/users'

import { ChangeUserStatusModal } from '../change-status-modal'

type UserModalMode = 'view' | 'edit' | 'status'

interface UsersTableActionsProps {
  user: User
}

export function UsersTableActions({ user }: Readonly<UsersTableActionsProps>) {
  const [modalOpen, setModalOpen] = useState<UserModalMode | null>(null)
  const router = useRouter()

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

  const statusButton = changingStatusData[user.status]

  return (
    <>
      <Menu>
        <MenuTrigger size='icon' variant='ghost' className='size-8'>
          <EllipsisIcon />
          <span className='sr-only'>Ações</span>
        </MenuTrigger>

        <MenuContent align='end'>
          <MenuItem onClick={() => setModalOpen('edit')}>
            <ClipboardPenIcon />
            Editar
          </MenuItem>

          <MenuItem
            onClick={() => router.push(ROUTES.dashboard.users.details(user.id))}
          >
            <UserSquare2Icon />
            Informações do usuário
          </MenuItem>

          <Divider className='my-1' />

          <MenuItem
            variant={statusButton.variant}
            onClick={() => setModalOpen('status')}
          >
            {statusButton.icon}
            {statusButton.label}
          </MenuItem>
        </MenuContent>
      </Menu>

      {modalOpen === 'status' && (
        <Dialog
          open={modalOpen === 'status'}
          onOpenChange={(open) => setModalOpen(open ? 'edit' : null)}
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
