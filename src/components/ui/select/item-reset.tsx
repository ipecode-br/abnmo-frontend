import { XIcon } from '@/components/ui/icons'

import { Divider } from '../divider'
import { SelectItem } from './item'

interface SelectItemResetProps {
  title: string
}

export function SelectItemReset({ title }: Readonly<SelectItemResetProps>) {
  return (
    <>
      <Divider className='my-2' />
      <SelectItem value='reset'>
        <div className='flex items-center gap-2'>
          <XIcon />
          {title}
        </div>
      </SelectItem>
    </>
  )
}
