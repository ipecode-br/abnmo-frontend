'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

import { SettingsHeader } from '@/modules/settings/layout/settings-header'

const HEADERS_TEXT = {
  notificacoes: {
    title: 'Notificações',
    description: 'Gerencie quais notificações deseja receber.',
  },
  fontes: {
    title: 'Tamanho da fonte',
    description: 'Selecione o tamanho da fonte',
  },
  policies: {
    title: 'Políticas de privacidade e termos de uso',
    description: 'Revise nossas políticas de privacidade e termos de uso.',
  },
}

export function SettingsContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]

  const pageKey = lastSegment === 'configuracoes' ? 'notificacoes' : lastSegment

  const { title, description } =
    HEADERS_TEXT[pageKey as keyof typeof HEADERS_TEXT]

  return (
    <div className='flex flex-1 flex-col overflow-hidden'>
      <SettingsHeader title={title} description={description} />
      {children}
    </div>
  )
}
