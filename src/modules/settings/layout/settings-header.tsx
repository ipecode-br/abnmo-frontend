import { Divider } from '@/components/ui/divider'

interface SettingsHeaderProps {
  title: string
  description: string
}

export function SettingsHeader({ title, description }: SettingsHeaderProps) {
  return (
    <>
      <header className='flex flex-col gap-1 px-8 py-4'>
        <h1 className='text-xl font-medium'>{title}</h1>
        <p className='text-foreground-soft'>{description}</p>
      </header>
      <Divider />
    </>
  )
}
