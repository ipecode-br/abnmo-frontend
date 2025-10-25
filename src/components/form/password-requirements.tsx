import { CheckIcon, DotIcon } from '@/components/ui/icons'
import { getPasswordRequirements } from '@/helpers/auth/get-password-requirement'
import { cn } from '@/utils/class-name-merge'

import { FormMessage } from './form-message'

interface PasswordRequirementsProps {
  value: string
}

export function PasswordRequirements({
  value,
}: Readonly<PasswordRequirementsProps>) {
  const requirements = getPasswordRequirements(value)
  const passwordStrength = requirements.filter((item) => item.isValid).length
  const strenghtLevels = [1, 2, 3]

  function getStrengthStatus() {
    if (passwordStrength > 4) return 'strong'
    if (passwordStrength > 2) return 'medium'
    return 'weak'
  }

  function getBarColor(item: number) {
    const strengthStatus = getStrengthStatus()
    const defaultColor = 'bg-border'

    if (strengthStatus === 'strong') {
      return 'bg-success'
    }
    if (strengthStatus === 'medium') {
      return item <= 2 ? 'bg-warning' : defaultColor
    }
    if (strengthStatus === 'weak') {
      return value && item === 1 ? 'bg-error' : defaultColor
    }
    return defaultColor
  }

  return (
    <div className='flex flex-col gap-1.5'>
      <div className='mt-1 flex gap-2'>
        {strenghtLevels.map((item) => (
          <div
            key={item}
            className={cn('h-1 w-full rounded', getBarColor(item))}
          />
        ))}
      </div>

      <FormMessage>Sua senha deve conter:</FormMessage>

      <ul className='space-y-0.5'>
        {requirements.map((item) => (
          <li
            key={item.type}
            data-valid={item.isValid}
            className='data-[valid=true]:text-success text-foreground-soft flex items-center gap-1 text-xs [&_svg]:size-3'
          >
            {item.isValid ? <CheckIcon /> : <DotIcon />}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}
