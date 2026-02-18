import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'
import { ResetPasswordForm } from '@/modules/auth/reset-password-form'

export const metadata: Metadata = {
  title: 'Redefinir senha',
}

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function Page({ searchParams }: Readonly<PageProps>) {
  const { token } = await searchParams

  if (!token) {
    redirect(ROUTES.auth.signIn)
  }

  return (
    <AuthCard title='Redefinir senha'>
      <ResetPasswordForm token={token} />

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
