import image from '@images/brand/icon.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { SignInForm } from '@/modules/auth/sign-in-form'

export const metadata: Metadata = {
  title: 'Acessar conta',
}

// TODO: redirect patients to new screening flow when it's ready
export default function Page() {
  return (
    <AuthCard
      image={image}
      title='Bem vindo(a)'
      description='Insira seus dados para entrar na sua conta'
    >
      <SignInForm />

      {/* <Divider text='ou' />

      <p className='text-foreground-soft text-center text-sm'>
        Não tem uma conta?{' '}
        <NavLink
          href={ROUTES.auth.signUp}
          className='text-foreground font-medium whitespace-nowrap'
        >
          Registre-se como paciente aqui
        </NavLink>
      </p> */}
    </AuthCard>
  )
}
