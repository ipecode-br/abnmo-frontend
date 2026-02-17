import image from '@images/brand/icon.svg'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AuthCard } from '@/components/auth/auth-card'
import { Divider } from '@/components/ui/divider'
import { NavLink } from '@/components/ui/nav-link'
import { ROUTES } from '@/constants/routes'
import type { UserRole } from '@/enums/users'
import { extractTokenData } from '@/helpers/extract-token-data'
import { SignUpForm } from '@/modules/auth/sign-up-form'

export const metadata: Metadata = {
  title: 'Cadastrar conta',
}

interface PageProps {
  searchParams: Promise<{ token?: string }>
}

export default async function Page({ searchParams }: Readonly<PageProps>) {
  const { token } = await searchParams

  if (!token) {
    redirect(ROUTES.auth.signIn)
  }

  const tokenValue = await extractTokenData<{
    email: string
    role: UserRole
  }>({ token })

  const CARD_CONTENT = {
    valid: {
      title: 'Cadastrar conta',
      description: 'Este convite expirou ou é inválido',
    },
    invalid: {
      title: 'Convite inválido',
      description: 'Este convite expirou ou é inválido',
    },
  }

  const isTokenValid = !!tokenValue
  const content = isTokenValid ? CARD_CONTENT['valid'] : CARD_CONTENT['invalid']

  return (
    <AuthCard
      image={image}
      title={content.title}
      description={content.description}
    >
      {isTokenValid ? (
        <SignUpForm token={token} role={tokenValue.role} />
      ) : (
        <p className='text-center'>
          Por favor, solicite um novo convite para realizar o cadastro da sua
          conta.
        </p>
      )}

      <Divider />

      <p className='text-foreground-soft text-center text-sm'>
        Já tem uma conta?{' '}
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
