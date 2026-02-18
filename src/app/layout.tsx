import './globals.css'

import type { Metadata } from 'next'

import { inter } from '@/lib/fonts'
import { cn } from '@/utils/class-name-merge'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: {
    template: '%s | Sistema Viver Melhor - SVM',
    default: 'Sistema Viver Melhor - SVM',
  },
  description:
    'Simplificando a gestão de pacientes, centralizando informações e dados sobre os processos de atendimento de pacientes.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-BR'>
      <body className={cn('overflow-x-hidden antialiased', inter.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
