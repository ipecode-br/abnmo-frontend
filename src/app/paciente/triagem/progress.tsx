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
      <h1 className='text-disabled'>TRIAGEM</h1>
      {formSteps.map((step, idx) => {
        const isActive = step.path === currentPathname
        return (
          <div key={step.label} className='flex gap-4'>
            <div
              data-active={isActive}
              className={cn(
                'bg-background text-foreground-soft flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-sm font-medium transition-colors',
                'data-[active=true]:bg-primary data-[active=true]:border-primary-soft data-[active=true]:text-white',
              )}
            >
              {idx + 1}
            </div>
            <div className='space-y-2'>
              <h2
                data-active={isActive}
                className='text-foreground-soft data-[active=true]:text-foreground text-lg font-semibold'
              >
                {step.label}
              </h2>
              <p className='text-foreground-soft'>{step.info}</p>
            </div>
          </div>
        )
      })}
    </aside>
  )
}
