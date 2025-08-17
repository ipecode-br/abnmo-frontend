'use client'

interface CityDataItem {
  name: string
  color: string
  percentage: number
}

interface CitiesProps {
  data: CityDataItem[]
}

export function Cities({ data }: Readonly<CitiesProps>) {
  return (
    <div className='grid grid-cols-2 gap-x-8 gap-y-2'>
      {data.map((item) => (
        <div key={item.name} className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm'>
            <div
              className='border-border size-2.5 rounded-full border'
              style={{ backgroundColor: item.color }}
            />
            <span className='text-foreground-soft text-xs font-medium'>
              {item.name}
            </span>
          </div>
          <div className='text-foreground-soft text-sm font-semibold'>
            {item.percentage}%
          </div>
        </div>
      ))}
    </div>
  )
}
