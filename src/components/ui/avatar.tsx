import Image, { type ImageProps } from 'next/image'
import type React from 'react'

import { User2Icon } from '@/components/ui/icons'
import { cn } from '@/utils/class-name-merge'

interface AvatarProps extends React.ComponentProps<'div'> {
  src?: ImageProps['src'] | null
}

export function Avatar({ src, className, ...props }: Readonly<AvatarProps>) {
  return (
    <div
      className={cn(
        'text-foreground-soft bg-background flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full [&_svg]:size-5',
        !src && 'border-border border',
        className,
      )}
      {...props}
    >
      {src ? (
        <Image
          alt=''
          src={src}
          height={144}
          width={144}
          className='size-full object-cover'
        />
      ) : (
        <User2Icon />
      )}
    </div>
  )
}
