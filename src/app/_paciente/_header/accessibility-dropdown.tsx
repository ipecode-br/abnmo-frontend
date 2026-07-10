'use client'

import { AccessibilityIcon, ALargeSmallIcon, ContrastIcon } from 'lucide-react'

import { Menu, MenuContent, MenuItem, MenuTrigger } from '@/components/ui/menu'

export function PatientHeaderAccessibilityDropdown() {
  return (
    <Menu>
      <MenuTrigger
        variant='muted'
        className='size-10 rounded-full [&_svg]:size-5'
      >
        <AccessibilityIcon />
      </MenuTrigger>

      <MenuContent align='end'>
        <MenuItem>
          <ALargeSmallIcon /> Aumentar texto
        </MenuItem>

        <MenuItem>
          <ALargeSmallIcon /> Diminuir texto
        </MenuItem>

        <MenuItem>
          <ContrastIcon /> Alto Contraste
        </MenuItem>
      </MenuContent>
    </Menu>
  )
}
