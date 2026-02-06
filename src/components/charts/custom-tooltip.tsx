// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomTooltip({ active, payload, coordinate }: any) {
  if (!active || !payload || !payload.length || !coordinate) return null

  const { x, y } = coordinate
  const value = payload[0].value
  const label = payload[0].payload.label

  return (
    <div>
      <div
        className='bg-foreground text-background pointer-events-none absolute flex flex-col items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-300 ease-out'
        style={{ left: x, top: y, transform: 'translate(-50%, -155%)' }}
      >
        <div>
          <span className='font-medium whitespace-nowrap'>{label}:</span>
          <span className='ml-1 font-bold'>{value}</span>
        </div>
        <div className='bg-foreground absolute -bottom-0.5 -z-10 mx-auto size-4 rotate-45' />
      </div>
      <div
        className='bg-primary-soft border-background pointer-events-none absolute size-3 rounded-full border-2 transition-all duration-150 ease-out'
        style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  )
}
