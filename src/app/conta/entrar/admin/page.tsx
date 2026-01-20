import image from '@images/brand/icon.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { SignInForm } from '@/modules/auth/sign-in-form'

export const metadata: Metadata = {
  title: 'Acessar painel administrativo',
}

export default function Page() {
  return (
    <AuthCard
      image={image}
      title='Painel administrativo'
      description='Insira seus dados para entrar na sua conta'
    >
      <SignInForm type='user' />
    </AuthCard>
  )
}
