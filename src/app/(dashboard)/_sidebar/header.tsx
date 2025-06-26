import Logo from '@images/logo/logo-triagem.svg'
import { PanelLeftCloseIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function SidebarHeader() {
  return (
    <header className='border-border text-foreground-soft flex items-center justify-between border-b pb-2'>
      <div className='flex items-center'>
        <Image src={Logo} alt='Logo' className='w-6' />
        <p className='ml-2 text-base font-bold'>SVM</p>
      </div>
      <Button
        size='icon'
        variant='ghost'
        className='text-disabled hover:text-foreground-soft'
      >
        <PanelLeftCloseIcon />
      </Button>
    </header>
  )
}
