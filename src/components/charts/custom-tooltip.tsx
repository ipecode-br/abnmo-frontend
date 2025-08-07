// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomTooltip({ active, payload, coordinate }: any) {
  if (!active || !payload || !payload.length || !coordinate) return null

  const { x, y } = coordinate
  const value = payload[0].value

  return (
    <div>
      <div
        className='bg-foreground text-background pointer-events-none absolute flex min-w-8 flex-col items-center rounded-md px-2 py-1.5 text-center text-sm transition-all duration-300 ease-out'
        style={{ left: x, top: y, transform: 'translate(-50%, -155%)' }}
      >
        {value}
        <div className='bg-foreground absolute -bottom-0.5 -z-10 size-4 rotate-45' />
      </div>
      <div
        className='bg-primary-soft border-background pointer-events-none absolute size-3 rounded-full border-2 transition-all duration-150 ease-out'
        style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  )
}
