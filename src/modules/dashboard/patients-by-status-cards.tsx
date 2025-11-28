import { CheckCircle2Icon, CircleXIcon, Users2Icon } from 'lucide-react'

import { getTotalPatientsByStatus } from '@/actions/patients/statistics/get-total-patients-by-status'
import { Card } from '@/components/ui/card'

export async function PatientsByStatusCards() {
  const statistics = await getTotalPatientsByStatus()

  if (!statistics) {
    return (
      <Card className='text-foreground-soft text-center text-sm md:col-span-6'>
        Não foi possível obter as estatísticas de pacientes por status.
      </Card>
    )
  }

  return statistics.map((statistic) => {
    const data = STATISTICS_MAPPING[statistic.label]
    if (!data) return null

    return (
      <Card
        key={statistic.label}
        className='flex min-h-28 flex-col justify-between gap-3 p-6 sm:col-span-2'
      >
        <div className='flex items-center justify-between'>
          <span className='text-4xl font-semibold'>{statistic.value}</span>
          <div
            className={`border-border rounded-full border p-2 [&_svg]:size-5 ${data.iconColor}`}
          >
            <data.icon />
          </div>
        </div>
        <p className='text-foreground-soft text-xs uppercase'>{data.title}</p>
      </Card>
    )
  })
}

const STATISTICS_MAPPING = {
  total: {
    title: (
      <>
        <strong>Total</strong> de pacientes
      </>
    ),
    icon: Users2Icon,
    iconColor: 'text-primary',
  },
  active: {
    title: (
      <>
        Total de pacientes <strong>ativos</strong>
      </>
    ),
    icon: CheckCircle2Icon,
    iconColor: 'text-success',
  },
  inactive: {
    title: (
      <>
        Total de pacientes <strong>inativos</strong>
      </>
    ),
    icon: CircleXIcon,
    iconColor: 'text-error',
  },
}
