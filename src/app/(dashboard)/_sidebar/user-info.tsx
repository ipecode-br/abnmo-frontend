import { ChevronDown, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface UserInfoProps {
  name: string
  role: string
}

export function SidebarUserInfo({ name, role }: Readonly<UserInfoProps>) {
  return (
    <div className='border-border flex items-center justify-between border-t pt-4'>
      <div className='flex items-center gap-3'>
        <div className='border-border text-foreground-soft rounded-full border p-2.5'>
          <UserRound className='size-5' />
        </div>
        <div>
          <p className='text-foreground text-sm capitalize'>{name}</p>
          <p className='text-foreground-soft text-xs'>{role}</p>
        </div>
      </div>
      <Button size='icon' variant='muted' className='rounded-full'>
        <ChevronDown className='text-foreground-soft' />
      </Button>
    </div>
  )
}
