import { ReactNode } from 'react'

interface DashboardOverviewPatientsCardProps {
  title: ReactNode
  value: number
  icon: ReactNode
}

export default function DashboardOverviewPatientsCard({
  title,
  value,
  icon,
}: Readonly<DashboardOverviewPatientsCardProps>) {
  const cardBase =
    'rounded-2xl border p-4 shadow-sm min-h-[5rem] max-h-[9rem] font-inter font-medium text-[var(--color-foreground)] border-[var(--color-border)] bg-[var(--color-card)]'

  const iconWrapper =
    'w-10 h-10 p-2 rounded-full border border-[var(--color-border)] flex items-center justify-center'

  return (
    <div className={cardBase}>
      <div className='flex items-start justify-between'>
        <span className='text-2xl font-bold'>{value}</span>
        <div className={iconWrapper}>{icon}</div>
      </div>
      <div>{title}</div>
    </div>
  )
}
