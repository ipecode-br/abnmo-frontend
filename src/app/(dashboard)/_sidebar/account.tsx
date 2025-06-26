import { ChevronRight, UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function SidebarAccount() {
  return (
    <div className='border-border flex items-center gap-3 border-t pt-8'>
      <div className='border-border text-foreground-soft rounded-full border p-2.5'>
        <UserRound className='size-5' />
      </div>

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
