'use client'

import icon from '@images/brand/icon.svg'
import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '@/constants/routes'
import { useSidebar } from '@/store/sidebar'

export function SidebarHeader() {
  const expanded = useSidebar((state) => state.expanded)

  return (
    <header className='relative flex items-center'>
      <Link href={ROUTES.dashboard.main}>
        <div className='flex items-center gap-3'>
          <Image src={icon} alt='Símbolo do SVM' className='size-10 shrink-0' />
          <span
            data-visible={expanded}
            className='text-lg font-bold opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100 data-[visible=true]:delay-150'
          >
            SVM
          </span>
        </div>
      </Link>
    </header>
  )
}
