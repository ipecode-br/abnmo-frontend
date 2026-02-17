import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/actions/users/get-current-user'
import { Avatar } from '@/components/ui/avatar'
import { Divider } from '@/components/ui/divider'
import { ROUTES } from '@/constants/routes'
import { ChangeUserPasswordButton } from '@/modules/profile/change-password-button'
import { UserProfileForm } from '@/modules/profile/profile-form'
import { formatDate } from '@/utils/formatters/format-date'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(ROUTES.auth.signOut)
  }

  const showUpdatedDate = new Date(user.updated_at) >= new Date(user.created_at)

  return (
    <>
      <div className='flex items-center gap-4'>
        <Avatar src={user.avatar_url} className='size-16' />
        <div>
          <p className='text-xl font-semibold'>{user.name}</p>
          <span className='text-foreground-soft text-sm'>{user.email}</span>
        </div>
      </div>

      <Divider />

      <UserProfileForm user={user} />

      <Divider />

      <ChangeUserPasswordButton className='place-self-start' />

      <Divider />

      <span className='text-foreground-soft text-sm'>
        Conta registrada em {formatDate(user.created_at)}.
        {showUpdatedDate &&
          ` Última atualização realizada em ${formatDate(user.updated_at)}.`}
      </span>
    </>
  )
}
