import image from '@images/auth/recover.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'

import { NewPasswordForm } from './new-password-form'

export const metadata: Metadata = {
  title: 'Redefinir senha',
}

interface NewPasswordPageProps {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function NewPasswordPage({
  searchParams,
}: Readonly<NewPasswordPageProps>) {
  const { token } = await searchParams
  // TODO: validate token when API is available

  if (!token) {
    console.error('Token is missing')
  }

  return (
    <AuthCard image={image} title='Redefinir senha'>
      <NewPasswordForm />

      <Divider />

      <p className='text-foreground-soft text-center text-sm'>
        <NavLink
          href={ROUTES.auth.signIn}
          className='text-foreground font-medium whitespace-nowrap'
        >
          Acessar sua conta
        </NavLink>
      </p>
    </AuthCard>
  )
}
