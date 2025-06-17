import { ChevronDown, UserRound } from 'lucide-react'

interface UserInfoProps {
  name: string
  role: string
}

export function UserInfo({ name, role }: UserInfoProps) {
  return (
    <div className='border-border flex items-center justify-between border-t pt-4'>
      <div className='flex items-center gap-3'>
        <div className='border-border text-foreground-soft rounded-[96px] border p-2.5'>
          <UserRound size={20} />
        </div>
        <div>
          <p className='text-foreground text-sm capitalize'>{name}</p>
          <p className='text-foreground-soft text-xs'>{role}</p>
        </div>
      </div>
      <button className='bg-background-soft text-foreground-soft hover:bg-background-soft flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-none shadow-none'>
        <ChevronDown size={15} />
      </button>
    </div>
  )
}
