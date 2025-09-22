'use client'

import * as SelectPrimitive from '@radix-ui/react-select'

export type SelectOptions = Array<{ label: string; value: string }>

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

/* USAGE

  <Select
    defaultValue={value}
    onValueChange={onChange}
  >
    <SelectTrigger>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value={value}>Content here</SelectItem>
      <SelectItem value={value}>Content here</SelectItem>
    </SelectContent>
  </Select>

*/
