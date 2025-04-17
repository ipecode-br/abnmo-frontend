import './globals.css'

import type { Metadata } from 'next'

import { inter } from '@/lib/fonts'

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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}
