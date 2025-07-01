import { ChevronRight } from 'lucide-react'

import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export function SidebarAccount() {
  return (
    <div className='flex items-center gap-3'>
      <Avatar />

      <div className='flex-1 space-y-1 truncate'>
        <p className='truncate text-sm'>José Fernandes</p>
        <p className='text-foreground-soft text-xs'>Enfermagem</p>
      </div>

      <Button size='icon' variant='muted' className='size-8 rounded-full'>
        <ChevronRight className='text-foreground-soft' />
      </Button>
    </div>
  )
}
