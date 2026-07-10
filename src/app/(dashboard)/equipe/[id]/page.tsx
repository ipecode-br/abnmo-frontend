import { Metadata } from 'next'

import { getUser } from '@/actions/users/get-user'
import { Avatar } from '@/components/ui/avatar'
import { Divider } from '@/components/ui/divider'
import { Tag } from '@/components/ui/tag'
import { SPECIALTIES } from '@/enums/shared'
import { USER_ROLES } from '@/enums/users'
import { UserFeaturesForm } from '@/modules/users/features-form'
import { formatDate } from '@/utils/formatters/format-date'

interface PageParams {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const userId = (await params).id
  const user = await getUser(userId)

  if (!user) return { title: 'Membro não encontrado' }

  return { title: user.name }
}

export default async function Page({ params }: PageParams) {
  const userId = (await params).id

  const user = await getUser(userId)

  if (!user) return null

  const { updatedAt, createdAt } = user
  const isSpecialist = user.role === 'specialist'
  const showUpdatedDate = new Date(updatedAt) > new Date(createdAt)

  return (
    <>
      <div className='flex items-center gap-6'>
        <Avatar src={user.avatarUrl} className='size-24' />
        <div className='flex flex-col gap-1'>
          <p className='text-xl font-semibold'>{user.name}</p>
          <span className='text-foreground-soft'>{user.email}</span>

          <div className='mt-2 flex flex-wrap items-center gap-x-6 gap-y-2'>
            <Tag>{USER_ROLES[user.role]}</Tag>
            {isSpecialist && (
              <>
                <div>
                  <span className='text-foreground-soft'>Especialidade: </span>
                  <span className='font-medium'>
                    {user.specialty
                      ? SPECIALTIES[user.specialty]
                      : 'Não informado'}
                  </span>
                </div>
                <div>
                  <span className='text-foreground-soft'>Registro: </span>
                  <span className='font-medium'>
                    {user.registrationId || 'Não informado'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Divider />

      <UserFeaturesForm user={user} />

      <Divider />

      <div className='text-foreground-soft flex flex-col gap-1 text-sm'>
        <span>
          Conta registrada em{' '}
          {formatDate(createdAt, { dateStyle: 'long', timeStyle: 'short' })}.
        </span>
        {showUpdatedDate && (
          <span>
            Última atualização realizada em{' '}
            {formatDate(updatedAt, { dateStyle: 'long', timeStyle: 'short' })}.
          </span>
        )}
      </div>
    </>
  )
}
