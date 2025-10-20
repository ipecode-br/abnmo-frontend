import logo from '@images/brand/icon.svg'
import { SettingsIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getProfile } from '@/actions/users'
import { PatientHeaderAccessibilityDropdown } from '@/app/paciente/_header/accessibility-dropdown'
import { PatientHeaderUserDropdown } from '@/app/paciente/_header/user-dropdown'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export async function PatientHeader() {
  const user = await getProfile()

  if (!user) return null

  return (
    <header className='flex items-center px-8 py-4'>
      <div className='flex items-center gap-3 font-medium'>
        <Image src={logo} alt='Logo do SVM' className='size-8' />
        <Link href={ROUTES.patient.main}>Início</Link>
      </div>

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

        <PatientHeaderUserDropdown user={user} />
      </section>
    </header>
  )
}
