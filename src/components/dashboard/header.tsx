'use client'

import { ChevronLeftIcon } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Breadcrumbs } from '@/components/breadcrumbs'
import { Divider } from '@/components/ui/divider'
import { SECTION_TITLES, type SectionTitle } from '@/constants/section-titles'

import { Button } from '../ui/button'

// TODO: implement utility buttons
export function DashboardHeader() {
  const router = useRouter()
  const pathnames = usePathname().split('/').filter(Boolean)

  const section = pathnames[0] as SectionTitle
  const sectionTitle = SECTION_TITLES[section || 'default']

  const showBreadcrumbs = !!pathnames[0]
  const showBackButton = pathnames.length > 0

  return (
    <header className='border-border flex h-16 shrink-0 items-center gap-4 border-b px-8'>
      {showBackButton && (
        <Button
          size='icon_sm'
          variant='ghost'
          aria-label='Voltar'
          className='-ml-2 [&_svg]:size-6'
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </Button>
      )}
      <h1 className='text-xl font-medium'>{sectionTitle}</h1>

      {showBreadcrumbs && (
        <>
          <Divider
            orientation='vertical'
            height='h-5'
            className='max-lg:hidden'
          />
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
