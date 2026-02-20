'use client'

import Image from 'next/image'
import Link from 'next/link'

import { IMAGES } from '@/constants/images'
import { ROUTES } from '@/constants/routes'
import { useSidebarStore } from '@/store/sidebar'

export function SidebarHeader() {
  const expanded = useSidebarStore((state) => state.expanded)

  return (
    <header className='relative flex items-center'>
      <Link href={ROUTES.dashboard.main}>
        <div className='flex items-center'>
          <Image
            src={IMAGES.icon}
            alt='Símbolo do SVM'
            className='size-10 shrink-0'
            height={80}
            width={80}
          />
          <span
            data-visible={expanded}
            className='text-primary absolute left-13 text-lg leading-none font-bold whitespace-nowrap opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100 data-[visible=true]:delay-150'
          >
            Sistema
            <br />
            Viver Melhor
          </span>
        </div>
      </Link>
    </header>
  )
}
