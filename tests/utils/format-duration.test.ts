import { formatDurationFromDays } from '@/utils/formatters/format-duration'

describe('formatDurationFromDays', () => {
  it('should format negative values as "0 dias"', () => {
    expect(formatDurationFromDays(-5)).toBe('0 dias')
  })

  it('should format days below 7 as "dias"', () => {
    expect(formatDurationFromDays(0)).toBe('0 dias')
    expect(formatDurationFromDays(1)).toBe('1 dia')
    expect(formatDurationFromDays(6)).toBe('6 dias')
  })

  it('should format days below 30 as "semanas"', () => {
    expect(formatDurationFromDays(7)).toBe('1 semana')
    expect(formatDurationFromDays(14)).toBe('2 semanas')
  })

  it('should round weeks to the nearest half', () => {
    expect(formatDurationFromDays(10)).toBe('1 semana e meia')
    expect(formatDurationFromDays(18)).toBe('2 semanas e meia')
    expect(formatDurationFromDays(25)).toBe('3 semanas e meia')
    expect(formatDurationFromDays(29)).toBe('4 semanas')
  })

  it('should format days below 365 as "meses"', () => {
    expect(formatDurationFromDays(30)).toBe('1 mês')
    expect(formatDurationFromDays(240)).toBe('8 meses')
  })

  it('should round months to the nearest half', () => {
    expect(formatDurationFromDays(45)).toBe('1 mês e meio')
    expect(formatDurationFromDays(135)).toBe('4 meses e meio')
    expect(formatDurationFromDays(350)).toBe('11 meses e meio')
  })

  it('should format 12 rounded months as 1 ano', () => {
    expect(formatDurationFromDays(355)).toBe('1 ano')
  })

  it('should format 365 or more days as "anos"', () => {
    expect(formatDurationFromDays(365)).toBe('1 ano')
    expect(formatDurationFromDays(730)).toBe('2 anos')
  })

  it('should format year remainders as "meses"', () => {
    expect(formatDurationFromDays(455)).toBe('1 ano e 3 meses')
    expect(formatDurationFromDays(605)).toBe('1 ano e 8 meses')
    expect(formatDurationFromDays(820)).toBe('2 anos e 3 meses')
  })

  it('should format half-year remainders as "e meio"', () => {
    expect(formatDurationFromDays(547)).toBe('1 ano e meio')
    expect(formatDurationFromDays(912)).toBe('2 anos e meio')
  })

  it('should drop half months from year remainders', () => {
    expect(formatDurationFromDays(775)).toBe('2 anos e 1 mês')
    expect(formatDurationFromDays(835)).toBe('2 anos e 3 meses')
  })

  it('should carry 12 rounded months into the next year', () => {
    expect(formatDurationFromDays(718)).toBe('2 anos')
  })
})
