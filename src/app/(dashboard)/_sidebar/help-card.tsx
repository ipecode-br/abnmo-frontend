'use client'

import { Headset, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/sidebar'

export function SidebarHelpCard() {
  const expanded = useSidebar((state) => state.expanded)

  return (
    <div
      data-visible={expanded}
      className='bg-background-soft relative w-56 space-y-3 rounded-2xl p-4 opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100 data-[visible=true]:delay-150'
    >
      <div className='flex items-center gap-2.5'>
        <Headset className='size-5' />
        <p className='font-medium tracking-tight'>Precisa de ajuda?</p>
      </div>

      <Button
        size='icon'
        variant='ghost'
        className='text-foreground-soft absolute top-1.5 right-1.5 size-8 [&_svg]:size-4'
      >
        <X />
      </Button>
      <p className='text-foreground-soft text-sm leading-tight'>
        Entre em contato com a nossa equipe de suporte.
      </p>
    </div>
  )
}
