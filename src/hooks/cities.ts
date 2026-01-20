'use client'

import { useMemo } from 'react'

import type { SelectOption } from '@/components/ui/select'
import { CITIES_BY_UF } from '@/constants/cities'
import type { UF } from '@/constants/enums'

export function useCities(uf: UF) {
  const cities = useMemo<SelectOption[]>(() => {
    if (!uf || !(uf in CITIES_BY_UF)) {
      return []
    }

    const citiesList = CITIES_BY_UF[uf] || []

    return citiesList.map((city) => ({ label: city, value: city }))
  }, [uf])

  return cities
}
