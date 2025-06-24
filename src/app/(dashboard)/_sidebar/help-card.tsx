import { Headset, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function SidebarHelpCard() {
  return (
    <div className='bg-background-soft relative mt-auto mb-8 flex flex-col gap-3 rounded-2xl p-4'>
      <div className='text-foreground/80 flex flex-row items-center gap-2.5'>
        <Headset size={20} />
        <p className='font-medium tracking-tighter'>Precisa de ajuda?</p>
      </div>
      <Button
        size='icon'
        variant='ghost'
        className='text-foreground-soft absolute top-1 right-3'
      >
        <X />
      </Button>
      <p className='text-foreground/60 text-sm leading-tight font-normal tracking-tight'>
        Entre em contato com a nossa equipe para obter suporte.
      </p>
    </div>
  )
}
