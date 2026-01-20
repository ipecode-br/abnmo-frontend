'use client'

import { ChartBarDecreasingIcon } from 'lucide-react'

import { BarChart } from '@/components/charts/bar'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'

const MOCK_DATA = [
  { label: 'Advogado', value: 15 },
  { label: 'Enfermeiro', value: 30 },
  { label: 'Fisioterapeuta', value: 22 },
  { label: 'Médico', value: 45 },
  { label: 'Neurologista', value: 15 },
  { label: 'Nutricionista', value: 18 },
  { label: 'Oftalmologista', value: 11 },
  { label: 'Psicólogo', value: 35 },
  { label: 'Psiquiatra', value: 55 },
  { label: 'Serviço social', value: 8 },
]

const isEmpty = MOCK_DATA.length === 0

export function ReferralsByCategoryCard(
  props: Readonly<React.ComponentProps<'div'>>,
) {
  return (
    <DashboardCardChart
      icon={ChartBarDecreasingIcon}
      title='Encaminhamentos por categoria'
      {...props}
    >
      <div className='flex h-full min-h-72 items-center justify-center'>
        {!isEmpty && (
          <div className='size-full min-h-40'>
            <BarChart data={MOCK_DATA} />
          </div>
        )}

        {isEmpty && (
          <p className='text-foreground-soft text-sm'>
            Nenhum encaminhamento por especialista registrado.
          </p>
        )}
      </div>
    </DashboardCardChart>
  )
}
