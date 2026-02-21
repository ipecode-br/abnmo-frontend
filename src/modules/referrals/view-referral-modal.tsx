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
import { PATIENT_CONDITIONS } from '@/enums/patients'
import { REFERRAL_STATUSES } from '@/enums/referrals'
import { SPECIALTIES } from '@/enums/shared'
import type { Referral } from '@/types/referrals'
import { formatDate } from '@/utils/formatters/format-date'

interface ViewReferralModalProps {
  referral: Referral
}

export function ViewReferralModal({
  referral,
}: Readonly<ViewReferralModalProps>) {
  const status = REFERRAL_STATUSES[referral.status]
  const condition = PATIENT_CONDITIONS[referral.condition]
  const specialty = SPECIALTIES[referral.category]
  const ConditionIcon = condition.icon

  const showUpdatedDate =
    new Date(referral.updated_at) > new Date(referral.created_at)

  return (
    <DialogContainer className='max-w-xl'>
      <DialogHeader icon={<DialogIcon icon={ClipboardCheckIcon} />}>
        <DialogTitle>Detalhes do encaminhamento</DialogTitle>
      </DialogHeader>

      <DialogContent className='grid gap-6 sm:grid-cols-9'>
        <DialogDetailField label='Paciente' className='sm:col-span-full'>
          <div className='flex items-center gap-3'>
            <Avatar className='size-12' src={referral.patient.avatar_url} />
            <span className='text-lg font-medium'>{referral.patient.name}</span>
          </div>
        </DialogDetailField>

        <DialogDetailField label='Data' className='sm:col-span-4'>
          {formatDate(referral.date)}
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
          {referral.professional_name ?? '-'}
        </DialogDetailField>

        {referral.annotation && (
          <DialogDetailField label='Observações' className='sm:col-span-full'>
            {referral.annotation}
          </DialogDetailField>
        )}

        <Divider className='sm:col-span-full' />

        <DialogDetailField label='Status' className='sm:col-span-3'>
          <Tag variant={status.variant}>{status.label}</Tag>
        </DialogDetailField>

        <DialogDetailField label='Criado em' className='sm:col-span-3'>
          {formatDate(referral.created_at)}
        </DialogDetailField>

        {showUpdatedDate && (
          <DialogDetailField label='Atualizado em' className='sm:col-span-3'>
            {formatDate(referral.updated_at)}
          </DialogDetailField>
        )}
      </DialogContent>
    </DialogContainer>
  )
}
