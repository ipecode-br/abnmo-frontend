import {
  ClipboardCheckIcon,
  ClipboardPasteIcon,
  Users2Icon,
} from 'lucide-react'

import { canUser } from '@/actions/auth/can-user'
import { getTotalAppointments } from '@/actions/statistics/get-total-appointments'
import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalReferrals } from '@/actions/statistics/get-total-referrals'
import { SummaryCard } from '@/components/summary-card'

export async function SummaryCards() {
  const [
    canViewStatistics,
    canViewPatientStatistics,
    canViewAppointmentStatistics,
    canViewReferralStatistics,
  ] = await Promise.all([
    canUser('read:statistic'),
    canUser('read:statistic:patient'),
    canUser('read:statistic:appointment'),
    canUser('read:statistic:referral'),
  ])

  const showPatientStatistics = canViewStatistics || canViewPatientStatistics
  const showAppointmentStatistics =
    canViewStatistics || canViewAppointmentStatistics
  const showReferralStatistics = canViewStatistics || canViewReferralStatistics

  const [patients, referrals, appointments] = await Promise.all([
    showPatientStatistics ? getTotalPatients() : undefined,
    showAppointmentStatistics ? getTotalReferrals() : undefined,
    showReferralStatistics ? getTotalAppointments() : undefined,
  ])

  return (
    <section className='col-span-full flex flex-wrap gap-4 max-md:flex-col'>
      {showPatientStatistics && (
        <SummaryCard
          icon={Users2Icon}
          label='Pacientes'
          value={patients?.total}
          className='flex-1'
        />
      )}
      {showAppointmentStatistics && (
        <SummaryCard
          icon={ClipboardPasteIcon}
          label='Encaminhamentos'
          value={referrals?.total}
          className='flex-1'
        />
      )}
      {showReferralStatistics && (
        <SummaryCard
          icon={ClipboardCheckIcon}
          label='Atendimentos'
          value={appointments?.total}
          className='flex-1'
        />
      )}
    </section>
  )
}
