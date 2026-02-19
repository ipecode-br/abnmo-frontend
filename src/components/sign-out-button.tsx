'use client'

import { LogOutIcon } from 'lucide-react'

import { logout } from '@/actions/auth/logout'

import { Button, type ButtonProps } from './ui/button'

export function SignOutButton(props: Readonly<ButtonProps>) {
  return (
    <Button className='mt-4 w-full' onClick={logout} {...props}>
      <LogOutIcon />
      Sair
    </Button>
  )
}
