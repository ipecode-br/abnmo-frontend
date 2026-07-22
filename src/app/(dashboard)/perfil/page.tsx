import { getCurrentUser } from '@/actions/users/get-current-user'
import { Avatar } from '@/components/ui/avatar'
import { Divider } from '@/components/ui/divider'
import { ChangeUserPasswordButton } from '@/modules/profile/change-password-button'
import { UserProfileForm } from '@/modules/profile/profile-form'
import { formatDate } from '@/utils/formatters/format-date'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const { updatedAt, createdAt } = user
  const showUpdatedDate = new Date(updatedAt) > new Date(createdAt)

  return (
    <>
      <div className='flex items-center gap-4'>
        <Avatar src={user.avatarUrl} className='size-18' />
        <div>
          <p className='text-xl font-semibold'>{user.name}</p>
          <span className='text-foreground-soft'>{user.email}</span>
        </div>
      </div>

      <Divider />

      <UserProfileForm user={user} />

      <Divider />

      <ChangeUserPasswordButton className='place-self-start' />

      <Divider />

      <div className='text-foreground-soft flex flex-col gap-1 text-sm'>
        <span>
          Conta registrada em{' '}
          {formatDate(createdAt, { dateStyle: 'short', timeStyle: 'short' })}.
        </span>
        {showUpdatedDate && (
          <span>
            Última atualização realizada em{' '}
            {formatDate(updatedAt, { dateStyle: 'short', timeStyle: 'short' })}.
          </span>
        )}
      </div>
    </>
  )
}
