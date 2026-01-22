'use client'

import { usePathname } from 'next/navigation'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Divider } from '@/components/ui/divider'
import { PAGE_TITLES, type PageTitle } from '@/constants/page-titles'

export function DashboardHeader() {
  const pathname = usePathname()

  const showBreadcrumbs = pathname !== '/'

  const page = pathname.split('/')[1] as PageTitle
  const pageTitle = PAGE_TITLES[page || 'default']

  return (
    <header className='border-border flex items-center gap-4 border-b px-8 py-4'>
      <h1 className='text-xl font-medium'>{pageTitle}</h1>

      {showBreadcrumbs && (
        <>
          <Divider orientation='vertical' height='h-5' />
          <Breadcrumbs />
        </>
      )}

      {/* <section className='ml-auto flex items-center gap-2'>
        <Button
          size='icon'
          variant='outline'
          className='rounded-full'
          aria-label='Ajuda'
        >
          <CircleHelpIcon className='text-foreground-soft' />
        </Button>

        <Button
          size='icon'
          variant='outline'
          className='rounded-full'
          aria-label='Notificações'
        >
          <BellIcon className='text-foreground-soft' />
        </Button>
      </section> */}
    </header>
  )
}
