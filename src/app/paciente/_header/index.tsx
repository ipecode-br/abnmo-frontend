import logo from '@images/brand/icon.svg'
import { SettingsIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { getProfile } from '@/actions/users'
import { PatientHeaderAccessibilityDropdown } from '@/app/paciente/_header/accessibility-dropdown'
import { PatientHeaderUserDropdown } from '@/app/paciente/_header/user-dropdown'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

import PatientDocumentsTab from '../_components/documents-tab'

export async function PatientHeader() {
  const user = await getProfile()

  if (!user) return null

  return (
    <header className='container'>
      <div className='flex items-center gap-8 py-4'>
        <Link
          href={ROUTES.patient.main}
          className='focus-visible:ring-ring rounded-full focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none'
        >
          <Image src={logo} alt='SVM' className='size-8' />
        </Link>

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

          <PatientHeaderUserDropdown user={user} />
        </section>
      </div>

      <PatientDocumentsTab />
    </header>
  )
}
