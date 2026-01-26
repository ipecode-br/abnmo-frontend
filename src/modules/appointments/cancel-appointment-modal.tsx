'use client'

import { CircleXIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { revalidateCache } from '@/actions/cache'
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
import { api } from '@/lib/api'
import { queryClient } from '@/lib/tanstack-query'
import type { Appointment } from '@/types/appointments'
import { formatDate } from '@/utils/formatters/format-date'

interface CancelAppointmentModalProps {
  appointment: Appointment
  onClose: () => void
}

export function CancelAppointmentModal({
  appointment,
  onClose,
}: Readonly<CancelAppointmentModalProps>) {
  const [isPending, startTransition] = useTransition()

  async function cancelAppointment() {
    startTransition(async () => {
      const response = await api(`/appointments/${appointment.id}/cancel`, {
        method: 'PATCH',
      })

      if (!response.success) {
        toast.error(response.message)
        return
      }

      queryClient.invalidateQueries({
        queryKey: [QUERY_CACHE_KEYS.appointments.main],
      })
      revalidateCache(NEXT_CACHE_TAGS.patient(appointment.patient_id))
      revalidateCache(NEXT_CACHE_TAGS.appointments.main)
      toast.success(response.message)
      onClose()
    })
  }

  return (
    <DialogContainer>
      <DialogHeader icon={<DialogIcon icon={CircleXIcon} />}>
        <DialogTitle>Cancelar atendimento</DialogTitle>
      </DialogHeader>

      <DialogContent>
        Você tem certeza que deseja cancelar o atendimento de{' '}
        <span className='font-semibold'>{appointment.patient.name}</span>,
        agendado para dia{' '}
        <span className='font-semibold'>{formatDate(appointment.date)}</span>?
      </DialogContent>

      <DialogFooter>
        <Button
          className='flex-1'
          loading={isPending}
          variant='destructive'
          onClick={cancelAppointment}
        >
          Confirmar cancelamento
        </Button>
        <DialogClose className='flex-1' disabled={isPending}>
          Cancelar
        </DialogClose>
      </DialogFooter>
    </DialogContainer>
  )
}
