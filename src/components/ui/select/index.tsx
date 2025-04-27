'use client'

import * as SelectPrimitive from '@radix-ui/react-select'

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

/* USAGE

  <Select
    defaultValue?=''
    onValueChange={() => {}}
  >
    <SelectTrigger>
      <SelectValue placeholder='' />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value=''>Content here</SelectItem>
      <SelectItem value=''>Content here</SelectItem>
    </SelectContent>
  </Select>

*/
