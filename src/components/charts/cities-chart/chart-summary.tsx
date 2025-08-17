interface ChartSummaryProps {
  label: string
  value: number | string
}

export function ChartSummary({ label, value }: Readonly<ChartSummaryProps>) {
  return (
    <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-foreground text-2xl font-semibold'>{value}</p>
        <p className='text-foreground-soft text-xs font-medium uppercase'>
          {label}
        </p>
      </div>
    </div>
  )
}
