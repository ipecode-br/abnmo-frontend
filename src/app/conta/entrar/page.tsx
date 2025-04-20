import image from '@images/auth/sign-in.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'

import { SignInForm } from './sign-in-form'

export const metadata: Metadata = {
  title: 'Acessar conta',
}

export default function SignInPage() {
  return (
    <AuthCard
      image={image}
      title='Bem vindo(a)'
      description='Insira seus dados para entrar na sua conta'
    >
      <SignInForm />

      <Divider text='ou' />

      <p className='text-foreground-soft text-center text-sm'>
        Não tem uma conta?{' '}
        <NavLink
          href={ROUTES.auth.signUp}
          className='text-foreground font-medium whitespace-nowrap'
        >
          Crie sua conta aqui
        </NavLink>
      </p>
    </AuthCard>
  )
}
