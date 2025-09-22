import { Bell, CircleHelp } from 'lucide-react'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'

export function DashboardHeader() {
  return (
    <>
      <header className='flex items-center gap-4 px-8 py-4'>
        <h1 className='text-xl font-medium'>Visão Geral</h1>
        <Divider orientation='vertical' height='h-5' />
        <Breadcrumbs />

        <section className='ml-auto flex items-center gap-2'>
          <Button
            size='icon'
            variant='outline'
            className='rounded-full'
            aria-label='Ajuda'
          >
            <CircleHelp className='text-foreground-soft' />
          </Button>

          <Button
            size='icon'
            variant='outline'
            className='rounded-full'
            aria-label='Notificações'
          >
            <Bell className='text-foreground-soft' />
          </Button>
        </section>
      </header>
      <Divider />
    </>
  )
}
