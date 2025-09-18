'use client'

import icon from '@images/brand/icon.svg'
import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'
import { useSidebar } from '@/store/sidebar'
import { cn } from '@/utils/class-name-merge'

export function SidebarHeader() {
  const expanded = useSidebar((state) => state.expanded)
  const toogleSidebar = useSidebar((state) => state.toogleSidebar)

  return (
    <header className='relative flex items-center'>
      <Link href={ROUTES.dashboard.main}>
        <div className='flex items-center gap-3'>
          <Image src={icon} alt='Símbolo do SVM' className='size-10 shrink-0' />
          {expanded && <p className='text-lg font-bold'>SVM</p>}
        </div>
      </Link>

      <Button
        size='icon'
        variant='outline'
        data-expanded={expanded}
        className={cn(
          'text-disabled hover:text-foreground-soft absolute top-14 -right-8 size-8 rounded-full transition-all delay-75 duration-300 [&_svg]:size-5',
          'data-[expanded=true]:top-0 data-[expanded=true]:-right-10 data-[expanded=true]:rotate-180',
        )}
        onClick={toogleSidebar}
      >
        <ChevronRightIcon />
      </Button>
    </header>
  )
}
