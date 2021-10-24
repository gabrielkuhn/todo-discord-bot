import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formatDateRelative = (date: Date): string => {
  return formatRelative(date, new Date(), { locale: ptBR })
}
