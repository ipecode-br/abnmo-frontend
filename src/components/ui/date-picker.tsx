'use client'
import 'react-day-picker/style.css'

import { VariantProps } from 'class-variance-authority'
import { CalendarDays } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'

import { Calendar } from './calendar'
import { Input, inputVariants } from './input'
import { Popover } from './popover'
import { PopoverContent } from './popover/content'
import { PopoverTrigger } from './popover/trigger'

export interface DatePickerProps extends VariantProps<typeof inputVariants> {
  name: string
  className?: string
  navMode?: 'step' | 'dropdown'
  onSelectDate?: (date: string) => void
  value?: string
}

export function DatePicker({
  name,
  className,
  variant,
  size,
  navMode,
  onSelectDate,
  value,
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  const dateFormatted = value
    ? formatDate(value, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : ''

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative flex w-full items-center'>
        <Input
          id={name}
          value={dateFormatted}
          variant={variant}
          className={cn(inputVariants({ variant, size, className }), 'pl-10')}
          placeholder='DD/MM/YYYY'
          readOnly
        />

        <PopoverTrigger
          size='icon'
          variant='ghost'
          className='text-disabled absolute left-1 size-8'
        >
          <CalendarDays />
        </PopoverTrigger>
      </div>

      <PopoverContent sideOffset={8}>
        <Calendar
          selected={value ? new Date(value) : undefined}
          onSelect={(date) => {
            if (onSelectDate) {
              onSelectDate(date ? date.toISOString() : '')
            }
          }}
          navMode={navMode}
        />
      </PopoverContent>
    </Popover>
  )
}
