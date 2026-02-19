'use client'

import {
  ClipboardClockIcon,
  ClipboardListIcon,
  ClipboardPenIcon,
  EllipsisIcon,
  XCircleIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Dialog } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'
import { ROUTES } from '@/constants/routes'
import type { Referral } from '@/types/referrals'

import { CancelReferralModal } from '../cancel-referral-modal'
import { ReferralModal } from '../referral-modal'

type ReferralModalMode = 'edit' | 'cancel'

interface ReferralsTableActionsProps {
  referral: Referral
}

export function ReferralsTableActions({
  referral,
}: Readonly<ReferralsTableActionsProps>) {
  const [modalOpen, setModalOpen] = useState<ReferralModalMode | null>(null)

  const router = useRouter()

  const canEdit = referral.status !== 'canceled'

  return (
    <>
      <Menu>
        <MenuTrigger size='icon_sm' variant='ghost' aria-label='Abrir ações'>
          <EllipsisIcon />
        </MenuTrigger>

        <MenuContent align='end'>
          {canEdit && (
            <MenuItem onClick={() => setModalOpen('edit')}>
              <ClipboardPenIcon />
              Editar
            </MenuItem>
          )}
          <MenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.info(referral.patient_id),
              )
            }
          >
            <ClipboardListIcon />
            Informações do paciente
          </MenuItem>
          <MenuItem
            onClick={() =>
              router.push(
                ROUTES.dashboard.patients.details.history(referral.patient_id),
              )
            }
          >
            <ClipboardClockIcon />
            Histórico do paciente
          </MenuItem>

          {canEdit && (
            <>
              <Divider className='my-1' />

              <MenuItem
                variant='destructive'
                onClick={() => setModalOpen('cancel')}
              >
                <XCircleIcon />
                Cancelar
              </MenuItem>
            </>
          )}
        </MenuContent>
      </Menu>

      {modalOpen === 'edit' && canEdit && (
        <Dialog
          open={modalOpen === 'edit'}
          onOpenChange={(open) => setModalOpen(open ? 'edit' : null)}
        >
          <ReferralModal
            referral={referral}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}

      {modalOpen === 'cancel' && canEdit && (
        <Dialog
          open={modalOpen === 'cancel'}
          onOpenChange={(open) => setModalOpen(open ? 'cancel' : null)}
        >
          <CancelReferralModal
            referral={referral}
            onClose={() => setModalOpen(null)}
          />
        </Dialog>
      )}
    </>
  )
}
