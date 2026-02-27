import { parseDateOnly } from '../parse-date-only'

/**
 * Formats a date value into a localized string using `Intl.DateTimeFormat`.
 *
 * Accepts:
 * - A `Date` object
 * - A date-only string in `YYYY-MM-DD` format (parsed as local time)
 * - A full ISO datetime string
 *
 * **Important**:
 * When receiving a date-only string (`YYYY-MM-DD`), it is parsed using
 * `parseDateOnly` to avoid unintended UTC timezone shifts.
 *
 * @param value - The date value to format. Can be a `Date`, `YYYY-MM-DD`, or ISO datetime string.
 * @param options - Optional `Intl.DateTimeFormat` formatting options.
 * @param timeZone - Timezone used for formatting. Defaults to `'America/Sao_Paulo'`.
 *
 * @returns A formatted date string in the `pt-BR` locale.
 *
 * @example
 * formatDate(new Date(), { dateStyle: 'short' })
 *
 * @example
 * formatDate('2026-02-07', { dateStyle: 'long' })
 *
 * @example
 * formatDate('2026-02-07T15:30:00.000Z', {
 *   dateStyle: 'short',
 *   timeStyle: 'short',
 * })
 */
export function formatDate(
  value: string | Date,
  options?: Intl.DateTimeFormatOptions,
  timeZone = 'America/Sao_Paulo',
): string {
  const dateTimeFormat = new Intl.DateTimeFormat('pt-BR', {
    timeZone,
    ...options,
  })

  if (value instanceof Date) {
    return dateTimeFormat.format(value)
  }

  if (value.length === 10) {
    const date = parseDateOnly(value)
    return dateTimeFormat.format(date)
  }

  const date = new Date(value)

  return dateTimeFormat.format(date)
}
