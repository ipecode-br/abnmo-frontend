import Logo from '@images/logo/logo-triagem.svg'
import { PanelLeft } from 'lucide-react'
import Image from 'next/image'

interface HeaderProps {
  name: string
}

export function Header({ name }: HeaderProps) {
  return (
    <header className='border-border flex items-center justify-between border-b pb-4'>
      <div className='flex items-center'>
        <Image src={Logo} alt='Logo' width={24} />
        <p className='ml-2 text-base font-bold'>{name}</p>
      </div>
      <button className='cursor-pointer bg-transparent p-0 shadow-none hover:bg-transparent'>
        {' '}
        <PanelLeft color='gray' size={20} />
      </button>
    </header>
  )
}
