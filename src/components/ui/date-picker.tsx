'use client'
import 'react-day-picker/style.css'

import { VariantProps } from 'class-variance-authority'
import { CalendarDays } from 'lucide-react'
import React, { useState } from 'react'

import { cn } from '@/utils/class-name-merge'
import { formatDate } from '@/utils/formatters/format-date'
import {
  formatDateInput,
  parseDateInput,
} from '@/utils/formatters/format-date-input'

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
  readOnly?: boolean
  allowTextInput?: boolean
  blockFutureDates?: boolean
}

export function DatePicker({
  name,
  className,
  variant,
  size,
  value,
  onSelectDate,
  navMode = 'step',
  allowTextInput = true,
  blockFutureDates = false,
}: Readonly<DatePickerProps>) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const dateFormatted = value ? formatDate(value, { dateStyle: 'short' }) : ''

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!allowTextInput) return

    const formattedValue = formatDateInput(e.target.value)
    setInputValue(formattedValue)

    // If the date is complete (DD/MM/YYYY), try to parse and update
    if (formattedValue.length === 10) {
      const parsedDate = parseDateInput(formattedValue)
      if (parsedDate) {
        // Check if future dates should be blocked
        if (blockFutureDates && parsedDate > new Date()) {
          // Don't update if the date is in the future and blocked
          return
        }
        if (onSelectDate) {
          onSelectDate(parsedDate.toISOString())
        }
      }
    }
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    if (onSelectDate) {
      onSelectDate(date ? date.toISOString() : '')
    }
    setInputValue('')
    setOpen(false)
  }

  const displayValue = inputValue || dateFormatted

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative flex w-full items-center'>
        <Input
          id={name}
          variant={variant}
          value={displayValue}
          placeholder='DD/MM/AAAA'
          readOnly={!allowTextInput}
          onChange={handleInputChange}
          className={cn(inputVariants({ variant, size, className }), 'pl-10')}
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
          navMode={navMode}
          onSelect={handleCalendarSelect}
          selected={value ? new Date(value) : undefined}
          blockFutureDates={blockFutureDates}
        />
      </PopoverContent>
    </Popover>
  )
}
