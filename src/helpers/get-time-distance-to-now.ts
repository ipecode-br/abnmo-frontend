import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getTimeDistanceToNow(date: string | Date) {
  return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
}
