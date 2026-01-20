import { Divider } from '../ui/divider'
import { TabButtons } from '../ui/tab-buttons'

interface DashboardTabButtonsProps {
  buttons: Array<{ title: string; path: string }>
}

export function DashboardTabButtons({
  buttons,
}: Readonly<DashboardTabButtonsProps>) {
  return (
    <>
      <TabButtons buttons={buttons} className='px-8' />
      <Divider />
    </>
  )
}
