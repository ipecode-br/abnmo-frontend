import {
  ChartBarDecreasingIcon,
  ClipboardCheckIcon,
  ClipboardPasteIcon,
} from 'lucide-react'
import type { Metadata } from 'next'

import { getTotalAppointments } from '@/actions/statistics/get-total-appointments'
import { getTotalAppointmentsByCategory } from '@/actions/statistics/get-total-appointments-by-category'
import { getTotalReferrals } from '@/actions/statistics/get-total-referrals'
import { getTotalReferralsByCategory } from '@/actions/statistics/get-total-referrals-by-category'
import { BarChart } from '@/components/charts/bar'
import { SummaryCard } from '@/components/summary-card'
import { ChartCard } from '@/components/ui/chart-card'
import { SPECIALTIES } from '@/enums/shared'

export const metadata: Metadata = {
  title: 'Histórico',
}

interface PatientHistoryPageParams {
  params: Promise<{ id: string }>
}

export default async function Page({
  params,
}: Readonly<PatientHistoryPageParams>) {
  const patientId = (await params).id

  const actionParams = { params: { patientId } }

  const [
    totalAppointments,
    totalAppointmentsByCategory,
    totalReferrals,
    totalReferralsByCategory,
  ] = await Promise.all([
    getTotalAppointments(actionParams),
    getTotalAppointmentsByCategory(actionParams),
    getTotalReferrals(actionParams),
    getTotalReferralsByCategory(actionParams),
  ])

  const totalAppointmentCategories =
    totalAppointmentsByCategory?.categories ?? []
  const totalAppointmentsByCategoryValues = totalAppointmentCategories.map(
    (item) => ({
      label: SPECIALTIES[item.category],
      value: Number(item.total),
    }),
  )

  const totalReferralCategories = totalReferralsByCategory?.categories ?? []
  const totalReferralsByCategoryValues = totalReferralCategories.map(
    (item) => ({
      label: SPECIALTIES[item.category],
      value: Number(item.total),
    }),
  )

  return (
    <div className='grid gap-6 sm:grid-cols-2'>
      <SummaryCard
        icon={ClipboardCheckIcon}
        label='Atendimentos'
        value={totalAppointments?.total}
      />
      <SummaryCard
        icon={ClipboardPasteIcon}
        label='Encaminhamentos'
        value={totalReferrals?.total}
      />

      <ChartCard
        title='Atendimentos por categoria'
        icon={ChartBarDecreasingIcon}
      >
        <div className='flex h-full min-h-60 items-center justify-center'>
          {totalAppointmentsByCategoryValues.length > 0 ? (
            <BarChart data={totalAppointmentsByCategoryValues} />
          ) : (
            <p className='text-foreground-soft text-sm'>
              Nenhum atendimento registrado.
            </p>
          )}
        </div>
      </ChartCard>
      <ChartCard
        title='Encaminhamentos por categoria'
        icon={ChartBarDecreasingIcon}
      >
        <div className='flex h-full min-h-60 items-center justify-center'>
          {totalReferralsByCategoryValues.length > 0 ? (
            <BarChart data={totalReferralsByCategoryValues} />
          ) : (
            <p className='text-foreground-soft text-sm'>
              Nenhum atendimento registrado.
            </p>
          )}
        </div>
      </ChartCard>
    </div>
  )
}
