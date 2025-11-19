'use client'

import { ChartPieIcon } from 'lucide-react'

import { PieChart } from '@/components/charts/pie'
import { DashboardCardChart } from '@/components/dashboard/cards/chart'

const PIE_COLORS = [
  '#E255F2',
  '#DF1C41',
  '#0F37E0',
  '#008B62',
  '#F17B2C',
  '#F2AE40',
  '#3AB795',
  '#8C6DFD',
]

const MOCK_DATA = {
  cities: [
    { city: 'São Paulo', percentage: 45 },
    { city: 'Rio de Janeiro', percentage: 25 },
    { city: 'Belo Horizonte', percentage: 15 },
    { city: 'Salvador', percentage: 8 },
    { city: 'Fortaleza', percentage: 5 },
    { city: 'Curitiba', percentage: 5 },
    { city: 'Recife', percentage: 34 },
    { city: 'Porto Alegre', percentage: 18 },
  ],
}

const data = MOCK_DATA.cities.map((item, index) => ({
  label: item.city,
  value: item.percentage,
  color: PIE_COLORS[index],
}))

export function PatientsLocation(props: Readonly<React.ComponentProps<'div'>>) {
  return (
    <DashboardCardChart
      icon={ChartPieIcon}
      title='Localização dos pacientes'
      {...props}
    >
      <div className='flex h-full min-h-44 flex-col items-center justify-center gap-6'>
        <PieChart data={data} className='size-46' />

        <div className='divide-border grid w-full grid-cols-2 gap-x-4 gap-y-1 divide-y'>
          {data.map((city) => {
            return (
              <div
                key={city.label}
                className='text-foreground-soft flex items-center gap-2 pt-1 text-sm'
              >
                <div
                  className='size-2.5 shrink-0 rounded-full'
                  style={{ backgroundColor: city.color }}
                />
                <span className='flex-1 truncate'>{city.label}</span>
                <span className='font-semibold'>{city.value}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardCardChart>
  )
}
