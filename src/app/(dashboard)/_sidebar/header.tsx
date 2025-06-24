import Logo from '@images/logo/logo-triagem.svg'
import { PanelLeft } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

interface HeaderProps {
  name: string
}

export function SidebarHeader({ name }: Readonly<HeaderProps>) {
  return (
    <header className='border-border text-foreground-soft flex items-center justify-between border-b'>
      <div className='flex items-center'>
        <Image src={Logo} alt='Logo' className='w-6' />
        <p className='ml-2 text-base font-bold'>{name}</p>
      </div>
      <Button size='icon' variant='ghost' className='text-foreground-soft'>
        <PanelLeft />
      </Button>
    </header>
  )
}
