import { cn } from '@/utils/class-name-merge'

interface DividerProps {
  flexItem?: boolean
  height?: string
  orientation?: 'horizontal' | 'vertical'
  text?: string
  width?: string
}

export function Divider({
  flexItem,
  height,
  orientation = 'horizontal',
  text,
  width = 'w-full',
}: Readonly<DividerProps>) {
  if (orientation === 'vertical') {
    return (
      <div
        data-testid='separator'
        className={cn('bg-border w-px', flexItem && 'self-stretch', height)}
      />
    )
  }

  return (
    <>
      {text ? (
        <div className={cn('relative flex items-center justify-center', width)}>
          <p className='bg-background text-foreground-soft z-10 px-3 text-sm'>
            {text}
          </p>
          <div
            data-testid='separator'
            className='bg-border absolute h-px w-full'
          />
        </div>
      ) : (
        <div data-testid='separator' className={cn('bg-border h-px', width)} />
      )}
    </>
  )
}
