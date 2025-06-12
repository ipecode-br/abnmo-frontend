import logo from '@images/logo/logo-triagem.svg'
import { SettingsIcon } from 'lucide-react'
import Image from 'next/image'

import { PatientHeaderAccessibilityDropdown } from '@/app/paciente/_header/accessibility-dropdown'
import { PatientHeaderUserDropdown } from '@/app/paciente/_header/user-dropdown'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'

export function PatientHeader() {
  return (
    <header className='container mx-auto flex items-center gap-8 px-8 py-4'>
      <div className='flex items-center gap-4'>
        <Image src={logo} alt='Logo do sistema SMV' className='size-8' />
        <h1 className='font-medium'>Formulário de Triagem</h1>
      </div>

      <Breadcrumbs />

      <section className='ml-auto flex items-center gap-2'>
        <PatientHeaderAccessibilityDropdown />

        <Button
          size='icon'
          variant='muted'
          className='rounded-full'
          aria-label='Configurações'
        >
          <SettingsIcon />
        </Button>

        <PatientHeaderUserDropdown />
      </section>
    </header>
  )
}
