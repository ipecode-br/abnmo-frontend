export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', options)

  return dateTimeFormat.format(new Date(date))
}
