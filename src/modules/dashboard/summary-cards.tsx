import { ClipboardListIcon, ClipboardPasteIcon, Users2Icon } from 'lucide-react'

import { getTotalAppointments } from '@/actions/statistics/get-total-appointments'
import { getTotalPatients } from '@/actions/statistics/get-total-patients'
import { getTotalReferrals } from '@/actions/statistics/get-total-referrals'
import { SummaryCard } from '@/components/summary-card'

export async function DashboardSummaryCards() {
  const [patients, referrals, appointments] = await Promise.all([
    getTotalPatients(),
    getTotalReferrals(),
    getTotalAppointments(),
  ])

  return (
    <>
      <SummaryCard
        icon={Users2Icon}
        label='Pacientes'
        value={patients?.total}
        className='sm:col-span-2'
      />
      <SummaryCard
        icon={ClipboardPasteIcon}
        label='Encaminhamentos'
        value={referrals?.total}
        className='sm:col-span-2'
      />
      <SummaryCard
        icon={ClipboardListIcon}
        label='Atendimentos'
        value={appointments?.total}
        className='sm:col-span-2'
      />
    </>
  )
}
