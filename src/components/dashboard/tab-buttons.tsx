'use client'

import { usePathname } from 'next/navigation'

import {
  SECTION_TAB_BUTTONS,
  type SectionTabButton,
} from '@/constants/section-tab-buttons'

import { Divider } from '../ui/divider'
import { TabButtons } from '../ui/tab-buttons'

export function DashboardTabButtons() {
  const segments = usePathname().split('/').filter(Boolean)
  const section = segments[0]

  const buttons = SECTION_TAB_BUTTONS[section as SectionTabButton]

  const hidePatientDetailsButtons =
    section === 'pacientes' && segments.length < 2

  if (!buttons || hidePatientDetailsButtons) {
    return null
  }

  // Resolve dynamic paths (e.g., for patients section with patient ID)
  const resolvedButtons = buttons.map((button) => ({
    title: button.title,
    path:
      typeof button.path === 'function'
        ? button.path(segments[1])
        : button.path,
  }))

  return (
    <>
      <TabButtons buttons={resolvedButtons} className='px-8' />
      <Divider />
    </>
  )
}
