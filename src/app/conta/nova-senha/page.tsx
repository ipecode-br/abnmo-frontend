import image from '@images/brand/icon.svg'
import type { Metadata } from 'next'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'

import { NewPasswordForm } from './new-password-form'

export const metadata: Metadata = {
  title: 'Redefinir senha',
}

interface PageProps {
  searchParams: Promise<{
    token?: string
  }>
}

export default async function Page({ searchParams }: Readonly<PageProps>) {
  const { token } = await searchParams

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
