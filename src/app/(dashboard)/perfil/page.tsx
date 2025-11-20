'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getProfile } from '@/actions/users'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'
import type { UserType } from '@/types/users'

import PasswordModal from './password-modal'

interface UserProfile extends UserType {
  category?: string
  register?: string
  avatar_url?: string | null
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getProfile()

        if (!data) {
          setUser(null)
          return
        }

        const formattedUser: UserProfile = {
          ...data,
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

  const isEspecialista = user.role?.toLowerCase() === 'especialista'

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <Card className='p-6'>
        <div className='mb-4 flex flex-col items-center gap-4'>
          <Avatar
            src={user.avatar_url}
            className='size-24 text-4xl [&_svg]:size-8'
          />
          <h2 className='text-2xl font-semibold'>Meu Perfil</h2>
        </div>

        <div className='grid gap-4'>
          <div>
            <label className='text-muted-foreground text-sm'>Nome</label>
            <Input value={user.name ?? ''} readOnly />
          </div>

          <div>
            <label className='text-muted-foreground text-sm'>
              Data de entrada
            </label>
            <DatePicker
              value={
                user.created_at
                  ? new Date(user.created_at).toLocaleDateString('pt-BR')
                  : undefined
              }
              readOnly
            />
          </div>

          <div>
            <label className='text-muted-foreground text-sm'>
              Profissional
            </label>
            <Input value={user.role ?? ''} readOnly />
          </div>

          {isEspecialista && (
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
            <Button
              variant='outline'
              onClick={() => setShowPasswordModal(true)}
            >
              Alterar senha
            </Button>
          </div>
        </div>
      </Card>

      <PasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  )
}
