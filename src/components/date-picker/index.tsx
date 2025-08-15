'use client'

import 'react-day-picker/style.css'

import { VariantProps } from 'class-variance-authority'
import { CalendarDays } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'

import { Calendar } from '../ui/calendar'
import { Input, inputVariants } from '../ui/input'
import { Popover } from '../ui/popover'
import { PopoverContent } from '../ui/popover/content'
import { PopoverTrigger } from '../ui/popover/trigger'

export interface DatePickerProps extends VariantProps<typeof inputVariants> {
  label?: string
  name: string
  className?: string
  navMode?: 'step' | 'dropdown'
  onSelectDate?: (date: string) => void
  value?: string
}

export function DatePicker({
  label,
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
      <div>
        <label htmlFor={name} className='text-xs font-medium'>
          {label}
        </label>
        <div className={cn('relative flex w-full items-center')}>
          <Input
            id={name}
            value={dateFormatted}
            variant={variant}
            readOnly
            className={cn(inputVariants({ variant, size, className }), 'pl-10')}
            placeholder='DD/MM/YYYY'
          />

          <PopoverTrigger
            size='icon'
            variant='ghost'
            className='text-disabled absolute left-1 size-8'
          >
            <CalendarDays />
          </PopoverTrigger>
        </div>
      </div>
      <PopoverContent>
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
