import { ClipboardCheckIcon } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'
import {
  DialogContainer,
  DialogContent,
  DialogDetailField,
  DialogHeader,
  DialogIcon,
  DialogTitle,
} from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Tag } from '@/components/ui/tag'
import { APPOINTMENT_STATUSES } from '@/enums/appointments'
import { PATIENT_CONDITIONS } from '@/enums/patients'
import { SPECIALTIES } from '@/enums/shared'
import type { Appointment } from '@/types/appointments'
import { formatDate } from '@/utils/formatters/format-date'

interface ViewAppointmentModalProps {
  appointment: Appointment
}

export function ViewAppointmentModal({
  appointment,
}: Readonly<ViewAppointmentModalProps>) {
  const status = APPOINTMENT_STATUSES[appointment.status]
  const condition = PATIENT_CONDITIONS[appointment.condition]
  const specialty = SPECIALTIES[appointment.category]
  const ConditionIcon = condition.icon

  const showUpdatedDate =
    new Date(appointment.updated_at) > new Date(appointment.created_at)

  return (
    <DialogContainer className='max-w-xl'>
      <DialogHeader icon={<DialogIcon icon={ClipboardCheckIcon} />}>
        <DialogTitle>Detalhes do atendimento</DialogTitle>
      </DialogHeader>

      <DialogContent className='grid gap-6 sm:grid-cols-9'>
        <DialogDetailField label='Paciente' className='sm:col-span-full'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-12' src={appointment.patient.avatar_url} />
            <span className='text-lg font-medium'>
              {appointment.patient.name}
            </span>
          </div>
        </DialogDetailField>

        <DialogDetailField label='Data' className='sm:col-span-4'>
          {formatDate(appointment.date)}
        </DialogDetailField>

        <DialogDetailField label='Quadro geral' className='sm:col-span-5'>
          <Tag variant={condition.variant}>
            <ConditionIcon /> {condition.label}
          </Tag>
        </DialogDetailField>

        <DialogDetailField label='Categoria' className='sm:col-span-4'>
          <Tag>{specialty}</Tag>
        </DialogDetailField>

        <DialogDetailField
          label='Profissional responsável'
          className='sm:col-span-5'
        >
          {appointment.professional_name ?? '-'}
        </DialogDetailField>

        {appointment.annotation && (
          <DialogDetailField label='Observações' className='sm:col-span-full'>
            {appointment.annotation}
          </DialogDetailField>
        )}

        <Divider className='sm:col-span-full' />

        <DialogDetailField label='Status' className='sm:col-span-3'>
          <Tag variant={status.variant}>{status.label}</Tag>
        </DialogDetailField>

        <DialogDetailField label='Criado em' className='sm:col-span-3'>
          {formatDate(appointment.created_at)}
        </DialogDetailField>

        {showUpdatedDate && (
          <DialogDetailField label='Atualizado em' className='sm:col-span-3'>
            {formatDate(appointment.updated_at)}
          </DialogDetailField>
        )}
      </DialogContent>
    </DialogContainer>
  )
}
