import { Button } from '@components/ui/button'

export default function Home() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <Button>Default button</Button>
      <Button variant='fancy'>Fancy button</Button>
      <Button variant='outline'>Outline button</Button>
      <Button size='sm'>Default button sm</Button>
      <Button variant='outline' size='sm'>
        Outline button sm
      </Button>
    </div>
  )
}
