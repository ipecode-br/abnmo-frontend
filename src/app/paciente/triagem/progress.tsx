'use client'

import { usePathname } from 'next/navigation'

import { ROUTES } from '@/constants/routes'
import { cn } from '@/utils/class-name-merge'

export function ScreeningProgress() {
  const currentPathname = usePathname()

  const formSteps = [
    {
      label: 'Seus dados',
      info: 'Preencha os campos para prosseguir para a próxima etapa.',
      path: ROUTES.patient.screening.patientData,
    },
    {
      label: 'Laudo Médico',
      info: 'Preencha os campos e anexe os documentos necessários.',
      path: ROUTES.patient.screening.medicalReport,
    },
    {
      label: 'Rede de apoio',
      info: 'Informe os dados de contato necessários.',
      path: ROUTES.patient.screening.supportNetwork,
    },
  ]

  return (
    <aside className='max-w-72 space-y-8'>
      <h1 className='text-disabled text-xs'>TRIAGEM</h1>
      {formSteps.map((step, idx) => {
        const isActive = step.path === currentPathname
        return (
          <div key={step.label} className='flex gap-4'>
            <div
              className={cn(
                'bg-background text-foreground-soft flex size-6 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-xs',
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
