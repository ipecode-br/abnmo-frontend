type ParseDateType = 'date' | 'ISOString' | 'DD/MM/YYYY' | 'YYYY-MM-DD'

interface ParseDateOptions {
  input?: ParseDateType
  output?: ParseDateType
}

/**
 * Parses a valid date string into a JavaScript Date object and optionally formats the output.
 *
 * @param value - The date value to parse (Date object, string, or null/undefined)
 * @param options - Configuration options for input and output formats
 * @param options.input - The format of the input string ('ISOString', 'DD/MM/YYYY', or 'YYYY-MM-DD')
 * @param options.output - The desired output format ('date', 'ISOString', 'DD/MM/YYYY', or 'YYYY-MM-DD')
 *
 * @returns The parsed date in the specified output format, or null if the input is invalid
 *
 * @example
 * // Parse a DD/MM/YYYY string and return as Date
 * parseDate('25/12/2023', { input: 'DD/MM/YYYY' })
 * // Returns: Date object for December 25, 2023
 *
 * @example
 * // Parse a YYYY-MM-DD string and format as ISO string
 * parseDate('2023-12-25', { input: 'YYYY-MM-DD', output: 'ISOString' })
 * // Returns: "2023-12-25T00:00:00.000Z"
 *
 * @example
 * // Format an existing Date as DD/MM/YYYY
 * parseDate(new Date('2023-12-25'), { output: 'DD/MM/YYYY' })
 * // Returns: "25/12/2023"
 *
 * @example
 * // Parse an ISO string and format as YYYY-MM-DD
 * parseDate('2023-12-25T10:30:00.000Z', { input: 'ISOString', output: 'YYYY-MM-DD' })
 * // Returns: "2023-12-25"
 */
export function parseDate<T>(
  value?: Date | string | null,
  options: ParseDateOptions = {},
): T | null {
  if (!value) return null as T

  const input = options.input
  const output = options.output

  let date: Date | null = null
  const isValueString = typeof value === 'string'

  if (value instanceof Date) {
    date = value
  }

  if (isValueString && input === 'ISOString') {
    date = new Date(value)
  }

  if (isValueString && input === 'DD/MM/YYYY') {
    const [day, month, year] = value.split('/').map(Number)
    date = new Date(year, month - 1, day)
  }

  if (isValueString && input === 'YYYY-MM-DD') {
    const [year, month, day] = value.split('-').map(Number)
    date = new Date(year, month - 1, day)
  }

  if (!date) return null as T

  if (output === 'ISOString') {
    return date.toISOString() as T
  }

  if (output === 'DD/MM/YYYY') {
    return date.toLocaleDateString('pt-BR') as T
  }

  if (output === 'YYYY-MM-DD') {
    return date.toISOString().split('T')[0] as T
  }

  return date as T
}
