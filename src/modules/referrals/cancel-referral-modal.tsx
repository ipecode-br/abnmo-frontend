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
import { NEXT_CACHE_TAGS, QUERY_CACHE_KEYS } from '@/constants/cache'
import { revalidateClientCache } from '@/helpers/revalidate-client-cache'
import { revalidateServerCache } from '@/helpers/revalidate-server-cache'
import { api } from '@/lib/api'
import type { Referral } from '@/types/referrals'
import { formatDate } from '@/utils/formatters/format-date'

interface CancelReferralModalProps {
  referral: Referral
  onClose: () => void
}

export function CancelReferralModal({
  referral,
  onClose,
}: Readonly<CancelReferralModalProps>) {
  const [isPending, startTransition] = useTransition()

  async function cancelReferral() {
    startTransition(async () => {
      const response = await api(`/referrals/${referral.id}/cancel`, {
        method: 'PATCH',
      })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      revalidateClientCache([
        QUERY_CACHE_KEYS.referrals.main,
        QUERY_CACHE_KEYS.statistics.totalReferralsByCategory,
        QUERY_CACHE_KEYS.statistics.totalReferralsByState,
        QUERY_CACHE_KEYS.statistics.totalReferrals,
      ])
      revalidateServerCache([
        NEXT_CACHE_TAGS.patient(referral.patient_id),
        NEXT_CACHE_TAGS.referrals.main,
        NEXT_CACHE_TAGS.statistics.totalReferrals.main,
        NEXT_CACHE_TAGS.statistics.totalPatientsWithReferrals.main,
      ])

      toast.success(response.message)
      onClose()
    })
  }

  return (
    <DialogContainer>
      <DialogHeader
        icon={<DialogIcon icon={CircleXIcon} variant='destructive' />}
      >
        <DialogTitle>Cancelar encaminhamento</DialogTitle>
      </DialogHeader>

      <DialogContent>
        Você tem certeza que deseja cancelar o encaminhamento de{' '}
        <span className='font-semibold'>{referral.patient.name}</span>, agendado
        para dia{' '}
        <span className='font-semibold'>{formatDate(referral.date)}</span>?
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={isPending}
          variant='destructive'
          onClick={cancelReferral}
        >
          Confirmar cancelamento
        </Button>
        <DialogClose className='flex-1' disabled={isPending}>
          Voltar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
