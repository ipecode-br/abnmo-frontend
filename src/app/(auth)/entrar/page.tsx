import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { SignInForm } from '@/modules/auth/sign-in-form'

export const metadata: Metadata = {
  title: 'Acessar conta',
}

export default function Page() {
  return (
    <AuthCard
      title='Bem vindo(a)'
      description='Insira seus dados para entrar na sua conta'
    >
      <SignInForm />
    </AuthCard>
  )
}
