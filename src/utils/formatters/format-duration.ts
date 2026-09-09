/**
 * Formats a day count into a legible Portuguese duration string.
 *
 * Unit logic:
 * - Less than 7 days → days
 * - Less than 30 days → weeks
 * - Less than 365 days → months
 * - 365+ days → years and months
 *
 * Weeks and months round to the nearest half unit (`"1 semana e meia"`,
 * `"4 meses e meio"`); months that round to 12 become `"1 ano"`. Year
 * remainders keep whole months only. Negative values clamp to 0.
 *
 * @param days - The number of days to format.
 *
 * @returns The formatted duration string in `pt-BR`.
 *
 * @example
 * formatDurationFromDays(1)
 * // '1 dia'
 *
 * @example
 * formatDurationFromDays(14)
 * // '2 semanas'
 *
 * @example
 * formatDurationFromDays(135)
 * // '4 meses e meio'
 *
 * @example
 * formatDurationFromDays(820)
 * // '2 anos e 3 meses'
 */
export function formatDurationFromDays(days: number): string {
  const totalDays = Math.max(0, Math.floor(days))

  if (totalDays < 7) {
    return totalDays === 1 ? '1 dia' : `${totalDays} dias`
  }

  if (totalDays < 30) {
    const weeks = roundToNearestHalf(totalDays / 7)
    return formatHalfUnit(weeks, 'semana', 'semanas', 'meia')
  }

  if (totalDays < 365) {
    const months = roundToNearestHalf(totalDays / 30)

    if (months >= 12) {
      return '1 ano'
    }

    return formatHalfUnit(months, 'mês', 'meses', 'meio')
  }

  const years = Math.floor(totalDays / 365)
  const remainderMonths = Math.floor(roundToNearestHalf((totalDays % 365) / 30))

  if (remainderMonths >= 12) {
    return formatYears(years + 1)
  }

  if (remainderMonths === 0) {
    return formatYears(years)
  }

  if (remainderMonths === 6) {
    return `${formatYears(years)} e meio`
  }

  return `${formatYears(years)} e ${formatWholeMonths(remainderMonths)}`
}

function roundToNearestHalf(value: number): number {
  return Math.round(value * 2) / 2
}

function formatYears(years: number): string {
  return years === 1 ? '1 ano' : `${years} anos`
}

function formatWholeMonths(months: number): string {
  return months === 1 ? '1 mês' : `${months} meses`
}

function formatHalfUnit(
  value: number,
  singular: string,
  plural: string,
  halfSuffix: string,
): string {
  const hasHalf = value % 1 !== 0
  const base = Math.floor(value)
  const unit = `${base === 1 ? singular : plural}`
  const baseText = `${base} ${unit}`

  return hasHalf ? `${baseText} e ${halfSuffix}` : baseText
}
