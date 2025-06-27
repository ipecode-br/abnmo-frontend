import { CircleCheckIcon, CircleXIcon } from 'lucide-react'

export const STATUS_TAGS = {
  active: {
    icon: CircleCheckIcon,
    class: '[&_svg]:text-success',
  },
  inactive: {
    icon: CircleXIcon,
    class: '[&_svg]:text-error',
  },
}
