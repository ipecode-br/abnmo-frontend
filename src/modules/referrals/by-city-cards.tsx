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
    { city: 'São José do Rio Preto', percentage: 15 },
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

export function ReferralsByCityCards(
  props: Readonly<React.ComponentProps<'div'>>,
) {
  return (
    <DashboardCardChart
      icon={ChartPieIcon}
      title='Localização dos pacientes'
      {...props}
    >
      <div className='flex size-full items-center gap-6 xl:gap-10'>
        <PieChart
          data={data}
          label='cidades'
          total={10}
          className='size-40 xl:size-48'
        />

        <div className='divide-border min-w-0 flex-1 divide-y'>
          {data.map((city) => {
            return (
              <div
                key={city.label}
                className='text-foreground-soft flex items-center gap-2 py-1 text-sm'
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
