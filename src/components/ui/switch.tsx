'use client'
import { Switch as BaseSwitch } from '@base-ui-components/react/switch'

export function Switch() {
  return (
    <BaseSwitch.Root
      defaultChecked
      className='data-[checked]:active:bg-primary from-primary active:bg-primary relative mx-3 flex h-5 w-10 cursor-pointer rounded-full bg-gradient-to-r from-35% to-gray-200 to-65% bg-[length:6.5rem_100%] bg-[100%_0%] bg-no-repeat p-px shadow-[inset_0_1.5px_2px] shadow-gray-200 transition-[background-position,box-shadow] duration-[125ms] ease-[cubic-bezier(0.26,0.75,0.38,0.45)] before:absolute before:rounded-full before:outline-offset-2 focus-visible:before:inset-0 focus-visible:before:outline focus-visible:before:outline-2 data-[checked]:bg-[0%_0%]'
    >
      <BaseSwitch.Thumb className='aspect-square h-full rounded-full bg-white shadow-[0_0_1px_1px,0_1px_1px,1px_2px_4px_-1px] shadow-gray-100 transition-transform duration-150 data-[checked]:translate-x-5 dark:shadow-black/25' />
    </BaseSwitch.Root>
  )
}
