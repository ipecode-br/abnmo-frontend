'use client'
import { useState } from 'react'

import {
  CircleQuestionMarkIcon,
  HeadsetIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
} from '@/components/ui/icons'
import { Popover } from '@/components/ui/popover'
import { PopoverContent } from '@/components/ui/popover/content'
import { PopoverTrigger } from '@/components/ui/popover/trigger'

export function ActionHelp() {
  const [open, setOpen] = useState(false)
  return (
    <div className='fixed right-8 bottom-8'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          variant='default'
          className='bg-foreground-soft hover:bg-accent-foreground/60 rounded-full p-2.5'
        >
          <CircleQuestionMarkIcon />
        </PopoverTrigger>

        <PopoverContent side='left' className='mb-5 gap-3 p-6'>
          <div className='flex items-center gap-2.5 text-2xl'>
            <HeadsetIcon />
            <h1>Precisa de ajuda?</h1>
          </div>

          <p className='text-foreground-soft text-center'>
            Entre em contato com a gente
            <br /> para obter suporte
          </p>

          <ul className='text-accent-foreground flex flex-col items-center gap-2 font-medium'>
            <li className='flex items-center gap-x-2'>
              <MailIcon />
              <span>contato@abnmo.org</span>
            </li>
            <li className='flex items-center gap-x-2'>
              <PhoneIcon />
              <span>+55 (75) 9980-1515</span>
            </li>
            <li className='flex items-center gap-x-2'>
              <LinkIcon />
              <span>www.abnmo.org</span>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  )
}
