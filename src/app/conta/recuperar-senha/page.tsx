import image from '@images/auth/recover.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'

import { RecoverForm } from './recover-form'

export const metadata: Metadata = {
  title: 'Recuperar senha',
}

export default function RecoverPasswordPage() {
  return (
    <AuthCard
      image={image}
      title='Recuperar senha'
      description='Insira seu e-mail para recuperar sua senha'
    >
      <RecoverForm />

      <Divider />

      <p className='text-foreground-soft text-center text-sm'>
        Mudou de ideia?{' '}
        <NavLink
          href={ROUTES.auth.signIn}
          className='text-foreground font-medium whitespace-nowrap'
        >
          Acesse sua conta
        </NavLink>
      </p>
    </AuthCard>
  )
}
