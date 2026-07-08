import './globals.css'

import type { Metadata } from 'next'

import { env } from '@/config/env'
import { inter } from '@/lib/fonts'
import { cn } from '@/utils/class-name-merge'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    template: '%s | Sistema Viver Melhor - SVM | ABNMO',
    default: 'Sistema Viver Melhor - SVM | ABNMO',
  },
  description:
    'Simplificando a gestão de pacientes, centralizando informações e dados sobre os processos de atendimento de pacientes.',
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-BR'>
      <body className={cn('root antialiased', inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
