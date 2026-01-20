import { NotificationCard } from './index'

export function NotificationPreferences() {
  return (
    <div className='flex flex-col gap-3'>
      <NotificationCard label='Desejo receber os alertas de notificação no Sistema Viver Melhor referente às minhas atividades.' />
      <NotificationCard label='Desejo receber os alertas de novidades no Sistema Viver Melhor.' />
      <NotificationCard label='Desejo receber os alertas de instabilidade no Sistema Viver Melhor.' />
      <NotificationCard label='Desejo receber alertas de pesquisas de satisfação da Ipê Code no Sistema Viver Melhor' />
    </div>
  )
}
