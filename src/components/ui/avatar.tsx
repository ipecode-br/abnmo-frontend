import { User2Icon } from 'lucide-react'
import Image, { type ImageProps } from 'next/image'
import type React from 'react'

import { cn } from '@/utils/class-name-merge'

interface AvatarProps extends React.ComponentProps<'div'> {
  src?: ImageProps['src']
}

export function Avatar({ src, className, ...props }: Readonly<AvatarProps>) {
  return (
    <div
      className={cn(
        'border-border text-foreground-soft flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border [&_svg]:size-5',
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
