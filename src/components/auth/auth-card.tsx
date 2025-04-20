import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import type { ReactNode } from 'react'

import { Divider } from '@/components/ui/divider'

interface AuthCardProps {
  image: string | StaticImport
  title: string
  description: string
  children: ReactNode
}

export function AuthCard({
  image,
  title,
  description,
  children,
}: Readonly<AuthCardProps>) {
  return (
    <div className='bg-background flex w-full max-w-md flex-col items-center gap-6 rounded-3xl p-8 shadow-xl/5'>
      <header className='flex flex-col items-center gap-1 text-center'>
        {image && <Image src={image} alt='' className='size-20' />}
        <h1 className='text-2xl font-medium'>{title}</h1>
        <p className='text-foreground-soft'>{description}</p>
      </header>

      <Divider />

      {children}
    </div>
  )
}
