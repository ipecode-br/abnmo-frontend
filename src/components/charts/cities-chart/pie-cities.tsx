export function PieCities({ count }: { count: number }) {
  return (
    <div className='absolute bottom-0 left-1/2 -translate-x-1/2'>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-foreground text-2xl font-semibold'>{count}</p>
        <p className='text-foreground-soft text-xs font-medium'>CIDADES</p>
      </div>
    </div>
  )
}
