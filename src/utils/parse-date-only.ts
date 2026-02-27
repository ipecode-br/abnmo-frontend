/**
 * Utility to parse date strings into Date objects.
 *
 * Date format must be in `YYYY-MM-DD`
 *
 * @example
 * const date = parseDateOnly('2023-01-01')
 */
export function parseDateOnly(value: string): Date {
  const [y, m, d] = value.split('-')
  return new Date(+y, +m - 1, +d)
}
