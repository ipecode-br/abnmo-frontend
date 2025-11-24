import { useState } from 'react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DatePicker } from '@/components/ui/date-picker'
import { Input } from '@/components/ui/input'

import PasswordModal from './password-modal'

export default function ProfilePage() {
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const isSpecialist = true

  return (
    <div className='mx-auto max-w-3xl p-6'>
      <Card className='p-6'>
        <div className='mb-4 flex flex-col items-center gap-4'>
          <Avatar className='size-24 text-4xl [&_svg]:size-8' />
          <h2 className='text-2xl font-semibold'>Meu Perfil</h2>
        </div>

        <div className='grid gap-4'>
          <div>
            <label className='text-muted-foreground text-sm'>Nome</label>
            <Input value='Nome de teste' readOnly />
          </div>

          <div>
            <label className='text-muted-foreground text-sm'>
              Data de entrada
            </label>
            <DatePicker readOnly />
          </div>

          <div>
            <label className='text-muted-foreground text-sm'>
              Profissional
            </label>
            <Input value='Profissional de teste' readOnly />
          </div>

          {isSpecialist && (
            <>
              <div>
                <label className='text-muted-foreground text-sm'>
                  Categoria
                </label>
                <Input
                  value='Valor de exemplo'
                  placeholder='Não informado'
                  readOnly
                />
              </div>

              <div>
                <label className='text-muted-foreground text-sm'>
                  Registro
                </label>
                <Input
                  value='Valor de exemplo'
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
