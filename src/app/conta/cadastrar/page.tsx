import image from '@images/auth/sign-in.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { getRoutes } from '@/constants/routes'

import { SignUpForm } from './sign-up-form'

export const metadata: Metadata = {
  title: 'Cadastrar conta',
}

export default function SignUpPage() {
  const routes = getRoutes()

  return (
    <AuthCard
      image={image}
      title='Cadastrar conta'
      description='Insira seus dados para criar sua conta'
    >
      <SignUpForm />

      <Divider text='ou' />

      <p className='text-foreground-soft text-center text-sm'>
        Já tem uma conta?{' '}
        <NavLink
          href={routes.auth.signIn}
          className='text-foreground font-medium whitespace-nowrap'
        >
          Acesse sua conta
        </NavLink>
      </p>
    </AuthCard>
  )
}
