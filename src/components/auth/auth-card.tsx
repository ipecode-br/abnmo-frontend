import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import type { ReactNode } from 'react'

import { Divider } from '@/components/ui/divider'
import { IMAGES } from '@/constants/images'

interface AuthCardProps {
  image?: string | StaticImport
  title: string
  description?: string
  children: ReactNode
}

export function AuthCard({
  image = IMAGES.icon,
  title,
  description,
  children,
}: Readonly<AuthCardProps>) {
  return (
    <div className='bg-background flex w-full max-w-md flex-col items-center gap-6 rounded-3xl p-8 shadow-xl/5'>
      <header className='flex flex-col items-center gap-1 text-center'>
        {image && (
          <Image
            alt=''
            src={image}
            height={128}
            width={128}
            className='mb-4 size-16'
          />
        )}
        <h1 className='text-2xl font-medium'>{title}</h1>
        {description && <p className='text-foreground-soft'>{description}</p>}
      </header>

      <Divider />

      {children}
    </div>
  )
}
