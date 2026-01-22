'use client'

import { ArrowLeftIcon, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getCurrentUser } from '@/actions/users'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { Divider } from '@/components/ui/divider'
import { Input } from '@/components/ui/input'
import { NavButton } from '@/components/ui/nav-button'
import { ChangePasswordButton } from '@/modules/profile/change-password-button'
import { ProfileForm } from '@/modules/profile/profile-form'

interface UserProfile {
  category?: string
  register?: string
  avatar_url?: string | null | undefined
  entryDate?: string | null | undefined
  role: 'specialist'
}

export default function Page() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser()

        if (!data) {
          setUser(null)
          return
        }

        const formattedUser: UserProfile = {
          ...data,
          role: 'specialist',
          entryDate: data.created_at
            ? new Date(data.created_at).toLocaleDateString('pt-BR')
            : undefined,
          category: (data as UserProfile).category ?? '',
          register: (data as UserProfile).register ?? '',
          avatar_url: (data as UserProfile).avatar_url ?? '',
        }

        setUser(formattedUser)
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className='flex h-[60vh] items-center justify-center'>
        <Loader2 className='text-muted-foreground h-6 w-6 animate-spin' />
      </div>
    )
  }

  if (!user) {
    return (
      <div className='text-muted-foreground flex h-[60vh] items-center justify-center'>
        Não foi possível carregar suas informações.
      </div>
    )
  }

  const isEspecialist = user.role?.toLowerCase() === 'especialist'

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <NavButton
        href=''
        variant='ghost'
        className='text-foreground-soft mr-auto'
      >
        <ArrowLeftIcon />
        Voltar
      </NavButton>
      <div className='flex gap-3'>
        <div className='flex flex-col items-center gap-1'>
          <Avatar className='size-16' />
          <Button variant='outline'>Escolher</Button>
        </div>
        <div className='flex flex-col'>
          <span>Imagem</span>
          <span className='text-foreground-soft text-sm'>
            Min 400x400px, PNG ou JPEG
          </span>
        </div>
        <div>
          <div>
            <label className='text-muted-foreground text-sm'>
              Data de entrada
            </label>
            <DatePicker
              value={new Date().toLocaleDateString('pt-BR')}
              readOnly
            />
          </div>

          <div>
            <label className='text-muted-foreground text-sm'>
              Profissional
            </label>
            <Input value={user.role ?? ''} readOnly />
          </div>

          {isEspecialist && (
            <>
              <div>
                <label className='text-muted-foreground text-sm'>
                  Categoria
                </label>
                <Input
                  value={user.category ?? ''}
                  placeholder='Não informado'
                  readOnly
                />
              </div>

              <div>
                <label className='text-muted-foreground text-sm'>
                  Registro
                </label>
                <Input
                  value={user.register ?? ''}
                  placeholder='Não informado'
                  readOnly
                />
              </div>
            </>
          )}

          <div className='pt-4'>
            <ChangePasswordButton />
          </div>
        </div>
      </div>
      <ProfileForm />
      <Divider />
      <ChangePasswordButton />
    </div>
  )
}
