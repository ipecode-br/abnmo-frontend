'use server'

import { env } from '@/config/env'

export async function getCitiesByUF(UF: string) {
  const REVALIDATE_IN_SECONDS = 86400 // 24 hours

  const response: Array<{ nome: string }> = await fetch(
    `${env.NEXT_PUBLIC_API_IBGE}/localidades/estados/${UF}/distritos`,
    {
      next: {
        revalidate: REVALIDATE_IN_SECONDS,
        tags: [`cities/${UF}`],
      },
    },
  ).then(async (res) => await res.json())

  if (!response) return null

  const cities = response.map((city) => city.nome)

  return cities
}
