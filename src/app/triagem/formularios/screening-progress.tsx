'use client'
import { usePathname } from 'next/navigation'

import { cn } from '@/utils/class-name-merge'

import { STEPS } from './form-steps'

export function ScreeningProgress() {
  const currentPathname = usePathname()

  return (
    <aside className='max-w-72 space-y-8'>
      <h1 className='text-disabled text-xs'>TRIAGEM</h1>

      {STEPS.map((step, idx) => {
        const isActive = step.path === currentPathname
        return (
          <div key={step.label} className='flex gap-4'>
            <div
              className={cn(
                'bg-background text-foreground-soft flex size-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-sm',
                isActive && 'bg-primary border-primary-soft text-white',
              )}
            >
              {idx + 1}
            </div>
            <div className='space-y-2'>
              <h2
                className={cn(
                  'text-foreground-soft font-semibold',
                  isActive && 'text-foreground',
                )}
              >
                {step.label}
              </h2>
              <p className='text-foreground-soft text-sm'>{step.info}</p>
            </div>
          </div>
        )
      })}
    </aside>
  )
}
