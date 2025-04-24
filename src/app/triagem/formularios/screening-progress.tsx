'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { steps } from './form-steps'

export function ScreeningProgress() {
  const [activeStep, setActiveStep] = useState<number>()
  const pathname = usePathname()

  useEffect(() => {
    const activeIndex = steps.findIndex((step) => step.path === pathname)
    setActiveStep(activeIndex)
  }, [pathname])

  return (
    <aside className='w-72'>
      <h1 className='text-soft-400 pb-8 text-xs'>TRIAGEM</h1>

      {steps.map((step, idx) => (
        <div key={idx}>
          <div
            className={`inline-flex items-center gap-4 text-base font-medium ${activeStep === idx ? 'font-semibold' : 'text-neutras-500'}`}
          >
            <span
              className={`flex size-6 items-center justify-center rounded-full border p-1 text-sm ${activeStep === idx ? 'bg-primaria-700 border-priamria-400 text-white' : 'text-sub-500 border-neutras-100'}`}
            >
              {step.indicator}
            </span>
            {step.label}
          </div>
          <p className='text-neutras-500 mt-2 mb-8 pl-10 text-sm'>
            {step.info}
          </p>
        </div>
      ))}
    </aside>
  )
}
