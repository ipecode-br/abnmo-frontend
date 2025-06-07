import logo from '@images/logo/logo-triagem.svg'
import { FilePenLine, House, Settings } from 'lucide-react'
import Image from 'next/image'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { AccessibilityDropdown } from '@/components/ui/dropdown/accessibility-dropdown'
import { UserDropdown } from '@/components/ui/dropdown/user-dropdown'

export function ScreeningHeader() {
  return (
    <header className='container mx-auto flex items-center justify-between px-8 py-4'>
      <div className='flex items-center space-x-4'>
        <div className='flex items-center space-x-4'>
          <Image
            src={logo}
            alt='logo do sistema de triagem'
            width={32}
            height={32}
          />
          <h1 className='font-medium'>Formulário de Triagem</h1>
        </div>

        <nav aria-label='Breadcrumb'>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href='/'
                  className='flex items-center text-gray-500'
                >
                  <House className='h-5 w-5' />
                  <span className='ml-1 text-sm'>Início</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator className='text-gray-500' />

              <BreadcrumbItem>
                <BreadcrumbPage className='flex items-center'>
                  <FilePenLine className='h-5 w-5' />
                  <span className='ml-1 text-sm'>Formulário de Triagem</span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
      </div>

      <div className='flex items-center gap-2'>
        <Button aria-label='Acessibilidade' asChild>
          <AccessibilityDropdown />
        </Button>
        <Button
          variant='muted'
          className='h-10 w-10 rounded-full'
          aria-label='Configurações'
        >
          <Settings className='text-[#656565]' />
        </Button>
        <UserDropdown />
      </div>
    </header>
  )
}
